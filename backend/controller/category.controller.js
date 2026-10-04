const { Category } = require("../models/category.model");

const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

module.exports = {
    getCategoryCount: async function (req, res) {
        try {
            const { search } = req.query;
            const filter = {};
            if (search && search.trim() !== "") {
                filter["catName"] = { $regex: search.toString().trim(), $options: "i" };
            }
            const count = await Category.countDocuments(filter);
            res.status(200).send({
                status: true,
                count: count
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    getCategoryList: async function (req, res) {
        try {
            const { search, page = 1, size = 10 } = req.query;
            const filter = {};
            if (search && search.trim() !== "") {
                filter["catName"] = { $regex: search.toString().trim(), $options: "i" };
            }
            const skip = (parseInt(page) - 1) * parseInt(size);
            let categories = await Category.find(filter, { catName: 1, catImg: 1}).skip(skip).limit(parseInt(size));
            categories = categories.map(category => {
                return {
                    id: category._id,
                    name: category.catName,
                    image: category.catImg
                };
            });
            res.status(200).send({
                status: true,
                data: categories
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    getCategoryDetail: async function (req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            if (!category) {
                throw new Error("No record found");
            }
            res.status(200).send({
                status: true,
                data: {
                    id: category._id,
                    name: category.catName,
                    image: category.catImg,
                    description: category.catDes,
                    status: category.catStatus,
                    slug: category.slug,
                    tags: category.tags,
                    created_at: category.createdAt
                }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    createCategory: async function (req, res) {
        try {
            const { name, description, tags } = req.body;
            const catImg = req.file ? req.file.filename : "";
            const slug = createSlug(catName);
            const category = new Category({ catName: name, catDes: description, catImg, slug, tags });
            await category.save();
            res.status(201).send({
                status: true,
                message: "Category created successfully.",
                data: category
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    updateCategory: async function (req, res) {
        try {
            const { id } = req.params;
            const { name, description, status, tags } = req.body;
            const catImg = req.file ? req.file.filename : undefined;
            const updateData = {
                ...(description && { catDes: description }),
                ...(status && { catStatus: status }),
                ...(catImg && { catImg }),
                ...(name && { slug: createSlug(name) }),
                ...(tags && { tags: req.body.tags })
            };
            const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
            if (!category) {
                throw new Error("No record found");
            }
            res.status(200).send({
                status: true,
                message: "Category updated successfully.",
                data: category
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    deleteCategory: async function (req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                throw new Error("No record found");
            }
            res.status(200).send({
                status: true,
                message: "Category deleted successfully."
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    }
}