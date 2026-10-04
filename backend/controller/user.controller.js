const { User } = require('../models/user.model');

module.exports = {

    getUserCount: async function (req, res) {
        try {
            const { search = "", status = "" } = req.query;
            const filter = {};
            if (search && search.trim()) {
                filter["$or"] = [
                    {
                        fullName: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ];
            }

            const count = await User.countDocuments(filter);
            res.status(200).send({
                status: true,
                count
            })
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later")
        }
    },

    getUsersList: async (req, res) => {
        try {
            const { search = "", status = "", page = 1, limit = 10 } = req.query;
            const query = {};

            if (search.trim()) {
                query["$or"] = [
                    {
                        fullName: {
                            $regex: search,
                            $options: "i",
                        }
                    }
                ];
            }
            if (status) {
                query.status = status;
            }
            const skip = ((Number(page) - 1)* Number(limit));
            let users =
                await User.find(query, { fullName:1, email:1, phoneNo:1, status: 1, createdAt:1 }).skip(skip).limit(limit);

            // Sort pets by plan priority first, then verified status
            users = users
                .map(function (list) {
                    return {
                        id: list._id,
                        name: list.fullName,
                        email: list.email,
                        phone: list.phoneNo,
                        status: list.status,
                        created_at: list.createdAt
                    };
                })
                .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
            res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }

    },

    getUserById: async (req, res) => {
        try {
            console.log(req.params);

            const { id } = req.params;
            const user = await User.findById(id, { fullName:1, email:1, phoneNo:1, status: 1, createdAt:1 });
            if (!user) {
                throw new Error("No record found");
            }
            const data = {
                id: user._id,
                name: user?.fullName,
                email: user?.email,
                phoneNo: user?.phoneNo,
                status: user?.status,
                created_at: user.createdAt
            }
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { fullName, email, phoneNo, password, status } = req.body;
            const user = await User.findById(id, { email: 1 });
            if (!user)
                throw new Error("No record found");

            const updates = await User.findOneAndUpdate(
                { _id: id },
                { fullName, email, phoneNo, password, status },
                { new: false }
            );
            if (!updates.modifiedCount)
                throw new Error("User updates failed. Please try later")

            
            return res.status(200).json({
                success: true,
                message: "User Updated successfully",
                data: user,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    changeStatus: async (req, res) => {
        try {
            const { id, code } = req.params;
            const user = await User.findById(id, { email: 1 });
            if (!user)
                throw new Error("No record found");

            const update = await User.findByIdAndUpdate(id, { $set: { status: !code ? 'Inactive' : 'Active' }});
            if (!update.modifiedCount)
                throw new Error("User deletion failed. Please try later");

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id, { email: 1 });
            if (!user)
                throw new Error("No record found");

            const update = await User.findByIdAndUpdate(id, { $set: { status: "Deleted" }});
            if (!update.modifiedCount)
                throw new Error("User deletion failed. Please try later");

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        } catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later.");
        }
    }
}