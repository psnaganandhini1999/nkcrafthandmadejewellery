const mongoose = require('mongoose');
const { Product, ProductVariant } = require('../models/product.model');

module.exports = {
    getProductCount: async function (req, res) {
        try {
            const { search } = req.query;
            const filter = { pdtStatus: "Active" };
            if (search) { 
                filter["pdtName"] = { $regex: search, $options: 'i' }; 
            };
            const count = await Product.find(filter, { pdtName: 1}).countDocuments();
            res.status(200).send({
                success: true,
                count,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    createProduct: async function (req, res) {
        const { pdtName, category, pdtDes, metaData, pdtDiscount, pdtStock, pdtImages, pdtTags, pdtStatus } = req.body;
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const pdtData = { 
                pdtName, 
                category, 
                pdtDes,  
                pdtDiscount, 
                pdtImages: typeof pdtImages === "string" ? pdtImages.startsWith("[") ? JSON.parse(pdtImages) : [pdtImages] : pdtImages, 
                pdtTags: typeof pdtTags === "string" ? pdtTags.startsWith("[") ? JSON.parse(pdtTags) : [pdtTags] : pdtTags, 
                pdtStatus 
            };
            const product = await Product.create([pdtData], { session });
            if (!product) {
                throw new Error("Product creation failed");
            }
            let variantData = metaData.map((item) => {
                let [ size, price, stock, color ] = item;
                return {
                    productId: product._id,
                    size,
                    price,
                    stock,
                    color
                };
            });
            const variant = await ProductVariant.create(variantData, { session });
            if (!variant) {
                throw new Error("Product variant creation failed");
            }

            await session.commitTransaction();
            res.status(200).send({
                success: true,
                message: "Product created successfully",
                product,
            });
        }
        catch (error) {
            await session.abortTransaction();
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
        finally {
            await session.endSession();
        }
    },

    updateProduct: async function (req, res) {
        const session = await mongoose.startSession();
        try {
            const updateData = req.body;
            const productId = req.params.id;
            session.startTransaction();
            const product = await Product.findByIdAndUpdate(productId, updateData);
            if (!product) {
                throw new Error("No record found");
            }
            const deletedVariants = await ProductVariant.deleteMany({ productId });
            if (deletedVariants.deletedCount === 0) {
                throw new Error("Product variant deletion failed");
            }
            let variantData = updateData.metaData.map((item) => {
                let [ size, price, stock, color ] = item;
                return {
                    productId: product._id,
                    size,
                    price,
                    stock,
                    color
                };
            });
            const variant = await ProductVariant.create(variantData);
            if (!variant) {
                throw new Error("Product variant creation failed");
            }
            await session.commitTransaction();
            res.status(200).send({
                success: true,
                message: "Product updated successfully",
                product,
            });
        } catch (error) {
            await session.abortTransaction();
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        } finally {
            await session.endSession();
        }
    },

    deleteProduct: async function (req, res) {
        const session = await mongoose.startSession();
        try {
            const productId = req.params.id;
            session.startTransaction();
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error("No record found");
            }
            const deletedVariants = await ProductVariant.deleteMany({ productId });
            if (deletedVariants.deletedCount === 0) {
                throw new Error("Product variant deletion failed");
            }
            await session.commitTransaction();
            res.status(200).send({
                success: true,
                message: "Product deleted successfully",
                product,
            });
        } catch (error) {
            await session.abortTransaction();
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        } finally {
            await session.endSession();
        }
    },

    getAllProducts: async function (req, res) { 
        try {
            const { page = 1, size = 10 } = req.query;
            const { search } = req.query;
            const filter = { pdtStatus: "Active" };
            if (search) { 
                filter["pdtName"] = { $regex: search, $options: 'i' }; 
            };
            const skip = (page - 1) * size;
            const products = await Product.find(filter, {pdtName:1, pdtDes:1, pdtImages:1}).populate({
                path: "category",
                select: "catName",
                as: "category"
            }).limit(size).skip(skip).sort({ createdAt: -1 });
            res.status(200).send({
                success: true,
                data: products.map(function (product) {
                    return {
                        id: product._id,
                        name: product.pdtName,
                        category_id: product.category._id,
                        category: product.category.catName,
                        description: product.pdtDes,
                        gallery: product.pdtImages
                    }
                }),
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    getProductDetail: async function (req, res) {
        try {
            const productId = req.params.id;
            console.log(productId, "PRODUCT ID")
            const products = await Product.find({ _id: productId }, { pdtName:1, pdtDes:1, pdtImages:1, pdtTags: 1 }).populate({
                path: "category",
                select: "catName",
                as: "category"
            });
            if (!products.length) {
                throw new Error("No record found");
            }
            const product = products[0];
            const variants = await ProductVariant.find({ productId }, { size:1, price:1, stock:1, color:1 });
            if (!variants.length) {
                throw new Error("Variants not found")
            }
            res.status(200).send({
                success: true,
                message: "Product details fetched successfully",
                product: {
                    id: product._id,
                    name: product.pdtName,
                    tags: product.pdtTags,
                    gallery: product.pdtImages,
                    description: product.pdtDes,
                    variant: variants.map(function (variant) {
                        return {
                            id: variant._id,
                            size: variant.size,
                            price: variant.price,
                            stock: variant.stock,
                            color: variant.color
                        };
                    })
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    }
}