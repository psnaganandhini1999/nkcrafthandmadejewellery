const CartDetails = require("../models/cart.model");
const OrderDetails = require("../models/order.model");
const { ProductVariant } = require("../models/product.model");

const DEFAULT_BILLING_ADDRESS = {
    billingName: process.env.SHOP_NAME,
    billingPhone: process.env.SHOP_MOBILE,
    billingEmail: process.env.SHOP_EMAIL,
    billingAddressLineOne: process.env.SHOP_ADDRESS_LINE_ONE,
    billingAddressLineTwo: process.env.SHOP_ADDRESS_LINE_TWO,
    billingCity: process.env.SHOP_CITY,
    billingState: process.env.SHOP_STATE,
    billingCountry: process.env.SHOP_COUNTRY,
    billingLandmark: process.env.SHOP_NEARBY_LANDMARK,
    billingZipCode: process.env.SHOP_ZIP_CODE
};

module.exports = {
    createOrder: async function (req, res) {
        const { body } = req;

        // initializing a session for transaction management
        const session = await mongoose.startSession();
        try {

            // starting a transaction to ensure atomicity of operations
            await session.withTransaction(async () => {

                // collecting products from cart based on items selected by user
                const products = await CartDetails
                    .find({ _id: { $in: body.productIds } })
                    .populate('productVariantId')
                    .session(session);

                // verify if all products are available in stock
                for (const product of products) {
                    if (product.productVariantId.stock < product.quantity) {
                        throw new Error(`Product ${product.productVariantId.name} is out of stock`);
                    }
                }

                // total amount calculation
                const totalAmount = products.reduce((acc, product) => acc + product.productVariantId.price * product.quantity, 0);

                // creating order payload with necessary details
                const orderData = {
                    items: products.map(product => ({
                        productId: product.productId,
                        productVariantId: product.productVariantId,
                        quantity: product.quantity,
                        price: product.productVariantId.price
                    })),
                    totalAmount,
                    userId: req.user._id,
                    paymentMethod: body.paymentMethod,
                    paymentStatus: 'pending',
                    orderStatus: 'pending',
                    billingAddress: {
                        ...DEFAULT_BILLING_ADDRESS
                    },
                    shippingAddress: {
                        shippingName: body.fullName,
                        shippingPhone: body.phoneNo,
                        shippingEmail: body.email,
                        shippingAddressLineOne: body.address,
                        shippingCity: body.city,
                        shippingState: body.state,
                        shippingCountry: body.country,
                        shippingLandmark: body.landmark,
                        shippingZipCode: body.pincode
                    },
                    orderNotes: body.orderNotes,
                    isGift: body.isGift,
                };

                // creating the order in the database
                let order = await OrderDetails.create([orderData], { session });
                if (!order || order.length === 0) {
                    throw new Error('Order creation failed');
                }
                order = order[0];

                // reducing stock for each product in the order
                let reduceStockPromises = products.map(product => {
                    return {
                        updateOne: {
                            filter: { _id: product.productVariantId._id },
                            update: { $inc: { stock: (-1 * product.quantity) } }
                        }
                    }
                });

                // executing bulk write operation to reduce stock for all products in the order
                let stockReduceUpdates = await ProductVariant.bulkWrite(reduceStockPromises, { session });
                if (!stockReduceUpdates) {
                    throw new Error('Failed to reduce stock for products');
                }

                // removing items from cart after order creation
                let removeItemsFromCart = await Cart.deleteMany({ _id: { $in: body.productIds } }, { session });
                if (!removeItemsFromCart) {
                    throw new Error('Failed to remove items from cart');
                }

                return res.status(201).json({
                    message: 'Order created successfully',
                    orderId: order._id,
                    totalAmount: order.totalAmount,
                    paymentMethod: order.paymentMethod,
                    paymentStatus: order.paymentStatus,
                    orderStatus: order.orderStatus
                });
            });
        }
        catch (error) {
            console.error('Error extracting request body:', error);
            return res.status(400).json({ message: 'Invalid request body' });
        }
        finally {
            session.endSession();
        }
    },

    getOrderCount: async function (req, res) {
        try {
            const { search = "", page = 1, size = 10 } = req.query;
            const filter = {};
            if (search && search.trim() != "") {
                filter['orderId'] = { $regex: search, $options: "i" };
            }

            const count = await OrderDetails.countDocuments(filter);
            res.status(200).send({
                status: true,
                count
            })
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    getOrderList: async function (req, res) {
        try {
            const { search = "", page = 1, size = 10 } = req.query;
            const filter = {};
            if (search && search.trim() != "") {
                filter['orderId'] = { $regex: search, $options: "i" };
            }
            const skip = (Number(page) - 1) * Number(size);
            const orders = await OrderDetails.find(filter, { _id: 1, items: 1, totalAmount: 1, orderStatus: 1, paymentStatus: 1 })
                .skip(skip).limit(size)
                .sort({ createdAt: -1 });

            // Sort pets by plan priority first, then verified status
            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }

    },

    getOrderById: async function (req, res) {
        try {
            const orderId = req.params.id;
            const order = await OrderDetails.findById(orderId).populate('items.productVariantId');

            if (!order) {
                throw new Error("Order not found");
            }

            return res.status(200).json({
                success: true,
                data: order,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}