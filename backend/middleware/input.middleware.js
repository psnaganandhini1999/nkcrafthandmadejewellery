const regexLib = require("../lib/regex.lib");

const INPUTS = {
    "user_login": {
        "body": {
            "email": {
                type: "string",
                label: "Email",
                required: true,
                pattern: regexLib.EMAIL,
            },
            "password": {
                type: "string",
                label: "Password",
                required: true,
                // pattern: regexLib.PASSWORD,
            }
        }
    },
    "user_create_account": {
        "body": {
            "fullName": {
                type: "string",
                label: "Name",
                required: true,
            },
            "email": {
                type: "string",
                label: "Email",
                required: true,
                pattern: regexLib.EMAIL,
            },
            "phoneNo": {
                type: "string",
                label: "Phone Number",
                required: true,
                pattern: regexLib.PHONE_NUMBER,
            },
            "password": {
                type: "string",
                label: "Password",
                required: true,
                pattern: regexLib.PASSWORD,
            }
        }
    },
    "user_forget_password": {
        "body": {
            "email": {
                type: "string",
                label: "Email",
                required: true,
                pattern: regexLib.EMAIL,
            }
        }
    },
    "user_reset_password": {
        "body": {
            "password": {
                type: "string",
                label: "Password",
                required: true,
                pattern: regexLib.PASSWORD,
            }
        },
        "user": {
            "id": {
                type: "string",
                label: "User ID",
                required: true,
            }
        }
    }
};


module.exports = {
    "validate": function (module_name) {
        const module = INPUTS[module_name];
        return (req, res, next) => {
            const { body, params, query } = req;
            const input_locations = ['body', 'params', 'query'];

            for (const location of input_locations) {
                if (module[location]) {
                    const input = req[location];
                    const rules = module[location];

                    for (const field in rules) {
                        const rule = rules[field];
                        const value = input[field];

                        if (rule.required && (value === undefined || value === null || value === '')) {
                            return res.status(400).send({
                                status: false,
                                message: `${rule.label} is required`
                            });
                        }

                        if (rule.pattern && value && !rule.pattern.test(value)) {
                            return res.status(400).send({
                                status: false,
                                message: `${rule.label} is invalid`
                            });
                        }

                        if (rule.minLength && value && value.length < rule.minLength) {
                            return res.status(400).send({
                                status: false,
                                message: `${rule.label} must be at least ${rule.minLength} characters`
                            });
                        }

                        if (rule.maxLength && value && value.length > rule.maxLength) {
                            return res.status(400).send({
                                status: false,
                                message: `${rule.label} must be at most ${rule.maxLength} characters`
                            });
                        }
                    }
                }
            }
            
            return next();
        }
    }
}