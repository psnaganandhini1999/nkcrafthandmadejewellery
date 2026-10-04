const Cart = require('../models/cart.model');

module.exports = {
    getUserCartList: async function (req, res) {
        const { id } = req.user;
        const filter = { userId: id };
        try {
            let result = await Cart.find(filter)
                .populate({path: 'productId', select:'pdtName pdtDes pdtImages', as:'product', match: { pdtStatus: 'Active' }})
                .populate({path: 'productVariantId', select:'size price stock color', as:'variant'});

            result = result
                .filter((item) => item.product && item.variant)
                .map((item) => {
                    return {
                        name: item.product.pdtName,
                        description: item.product.pdtDes,
                        images: item.product.pdtImages,
                        size: item.variant.size,
                        price: item.variant.price,
                        stock: item.variant.stock,
                        color: item.variant.color,
                        quantity: item.quantity,
                        added_on: item.createdAt,
                        total_amount: (item.quantity * item.variant.price)
                    }
                });

            res.status(200).send({
                status: true,
                data: result
            });
        }
        catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            })
        }
    },

    addProductToCart: async function (req, res) {
        const { id } = req.user;
        const { productId, productVariantId, quantity } = req.body;
        try {
            const existingCartItem = await Cart.findOne({ userId: id, productId, productVariantId });
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
            } 
            else {
                const newCartItem = new Cart({
                    userId: id,
                    productId,
                    productVariantId,
                    quantity
                });
                await newCartItem.save();
            }
            res.status(200).send({
                status: true,
                message: existingCartItem ? "Cart updated successfully" : "Product added to your cart successfully"
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            });
        }
    },

    updateCartItemQuantity: async function (req, res) {
        const { id } = req.user;
        const { cartItemId, quantity } = req.body;
        try {
            const cartItem = await Cart.findOne({ _id: cartItemId, userId: id });
            if (!cartItem) {
                return res.status(404).send({
                    status: false,
                    message: "Cart item not found"
                });
            }
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).send({
                status: true,
                message: "Cart item quantity updated successfully"
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            });
        }
    },

    removeProductFromCart: async function (req, res) {
        const { id } = req.user;
        const { cartItemId } = req.body;
        try {
            const result = await Cart.deleteOne({ _id: cartItemId, userId: id });
            if (result.deletedCount === 0) {
                return res.status(404).send({
                    status: false,
                    message: "Cart item not found"
                });
            }
            res.status(200).send({
                status: true,
                message: "Product removed from your cart successfully"
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            });
        }
    },

    clearUserCart: async function (req, res) {
        const { id } = req.user;
        try {
            await Cart.deleteMany({ userId: id });
            res.status(200).send({
                status: true,
                message: "Cart cleared successfully"
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            });
        }
    }
};