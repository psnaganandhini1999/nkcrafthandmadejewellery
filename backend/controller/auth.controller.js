const mongoose = require("mongoose");

const { User } = require('../models/user.model');

const encService = require('../service/enc.service');
const jwtService = require('../service/jwt.service');
const { TOKEN_OPTIONS } = require("../lib/helper.lib");

module.exports = {
    register: async function (req, res) {
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async function () {
                const { fullName, email, phoneNo, password } = req.body;         
                const userExists = await User.findOne({ email: email.toLowerCase() }, { email:1 }, {session});
                if (userExists) {
                    return res.status(400)
                        .send({ 
                            status: false, 
                            message: "User already exists."
                        });
                }
                const hashedPassword = await encService.encryptPassword(password);
                const userData = {
                    fullName,
                    email,
                    phoneNo,
                    password: hashedPassword,
                };r

                const [user] = await User.create([userData], { session });
                res.status(200).send({
                    status: true,
                    message: "Registration completed successfully."
                });
            });
        }
        catch (error) {   
            console.error(error);
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later."
            })
        }
        finally {
            session.endSession();
        }
    },

    login: async function (req, res) {
        const session = await mongoose.startSession();
        try {
            const { email, password } = req.body;
            await session.withTransaction(async function () {
                const user = await User.findOne({ email }, {_id: 1, email: 1, status: 1, password: 1}, { session });
                if (!user || user.status === 'Deleted') {
                    return res.status(400).send({
                        status: false,
                        message: "User doesn't exist"
                    })
                }
                if (user.status === 'Inactive') {
                    return res.status(400).send({
                        status: false,
                        message: "Your account is temproarily suspended. Please contact our support."
                    });
                }

                const isPasswordValid = await encService.comparePassword(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password",
                    });
                }
                const token = jwtService.generateToken({ id: user._id, email: user.email }, TOKEN_OPTIONS.USER);

                res.status(200).json({
                    success: true,
                    message: "Login successfully.",
                    access_token: token
                });
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            })
        }
        finally {
            session.endSession();
        }
    },

    forgetPassword: async function (req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email }, {_id: 1, email: 1, status: 1});
            if (!user || user.status === 'Deleted') {
                return res.status(400).send({
                    status: false,
                    message: "User doesn't exist"
                })
            }
            if (user.status === 'Inactive') {
                return res.status(400).send({
                    status: false,
                    message: "Your account is temproarily suspended. Please contact our support."
                });
            }

            const token = jwtService.generateToken({ id: user._id, email: user.email }, TOKEN_OPTIONS.TEMP);

            res.status(200).json({
                success: true,
                message: "Email sent successfully. Please check your regisered email inbox",
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            })
        }
    },

    resetPassword: async function (req, res) {
        try {
            const { email } = req.user;
            const { password } = req.body;
            const user = await User.findOne({ email }, {_id: 1, email: 1, status: 1});
            if (!user || user.status === 'Deleted') {
                return res.status(400).send({
                    status: false,
                    message: "User doesn't exist"
                })
            }
            const hash = await encService.generatePassword(password);
            const updated = await User.updateOne({ email }, { password: hash });
            if (!updated) {
                return res.status(400).send({
                    status: false,
                    message: "Password reset failed. Please try again"
                })
            }

            res.status(200).json({
                success: true,
                message: "Password reset successfully.",
            });
        }
        catch (error) {
            res.status(500).send({
                status: false,
                message: "Something went wrong. Please try later"
            })
        }
    }
}