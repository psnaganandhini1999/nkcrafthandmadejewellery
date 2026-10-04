const { UserActivity } = require("../models/user.model");
const { AdminActivity } = require("../models/admin.model");

module.exports = {
    storeUserActivtiy: function (inputs) {
        try {
            const { body, headers, params, query, user } = inputs;
        }
        catch (error) {
            console.error(error);
        }
    },

    storeAdminActivity: function (inputs) {
        try {
            const { body, headers, params, query, user } = inputs;
        }
        catch (error) {
            console.error(error);
        }
    }
}