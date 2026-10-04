const { Admin } = require("../models/admin.model");

module.exports = {

    getAdminCount: async function (req, res) {
        try {
            const { search } = req.query;
            const filter = { status: "active" };
            if (search) { 
                filter["$or"] = [
                    { firstname: { $regex: search, $options: 'i' } },
                    { lastname: { $regex: search, $options: 'i' } },
                ];
            };
            const resp = await Admin.countDocuments(filter);

            res.status(200).send({
                status: true,
                count: resp
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },

    getAdminList: async function (req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const { search } = req.query;
            const filter = { status: "active" };
            if (search) { 
                filter["$or"] = [
                    { firstname: { $regex: search, $options: 'i' } },
                    { lastname: { $regex: search, $options: 'i' } },
                ];
            };
            const skip = (Number(page) - 1) * Number(size);
            const resp = await Admin.find(filter, { firstname:1, lastname: 1, role:1, createdAt:1 }).skip(skip).limit(Number(size));
            const result = resp.map(function (list) {
                return {
                    id: list._id,
                    username: ((list.firstname || "NA") + " " + (list.lastname || "NA")),
                    role: (list.role || "NA"),
                    created_date: list.createdAt
                }
            });

            res.status(200).send({
                status: true,
                data: result
            });
        }
        catch (error) {   
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },

    getAdminDetail: async function (req, res) {
        try {
            const { id } = req.params;         
            const resp = await Admin.findById(id, { firstname: 1, lastname: 1, email:1, role:1, status: 1 });
            if (!resp) {
                throw new Error("No record found");
            }
            res.status(200).send({
                status: true,
                data: {
                    role: resp.role || "NA",
                    email: resp.email || "NA",
                    status: resp.status,
                    lastname: resp.lastname || "NA",
                    firstname: resp.firstname || "NA",
                }
            });
        }
        catch (error) {   
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },

    createAdmin: async function (req, res) {    
        try {
            const { firstname, lastname, email, password, status, role } = req.body;         
            const resp = await Admin.findOne({ email }, { email:1 });
            if (resp) {
                throw new Error("User already exists. Please try different email address");
            }
            const payload = { role, email, password, lastname, firstname };
            const admin = await Admin.create([adminData]);
            res.status(200).send({
                status: true,
                message: "Admin created successfully."
            });
        }
        catch (error) {   
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },

    updateAdmin: async function (req, res) {
        try {
            const { id } = req.params;
            const { fullName, email, phoneNo, password, role } = req.body;         
            const result = await Admin.findById(id, { email:1 });
            if (!result) {
                throw new Error("No record found");
            }

            const updates = { firstname, lastname };
            const admin = await Admin.findByIdAndUpdate(id, { $set: updates }, { new: false });
            if (!admin.modifiedCount)
                throw new Error("Admin updation failed. Please try later");

            return res.status(200).send({
                status: true,
                message: "Admin updated successfully."
            });
        }
        catch (error) {   
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },
    
    deleteAdmin: async function (req, res) {
        try {
            const { id } = req.params;         
            const result = await Admin.findById(id, { email: 1});
            if (!result) {
                throw new Error("No record found")
            }

            const update = await Admin.findByIdAndUpdate(id, { $set: { status: "deleted" }});
            if (!update.modifiedCount)
                throw new Error("Failed to delete admin. Please try later.")
            
            return res.status(200).send({
                status: true,
                message: "Admin deleted successfully."
            });
        }
        catch (error) {   
            console.error(error);
            throw new Error(error.message || "Something went wrong. Please try later");
        }
    },
    
}