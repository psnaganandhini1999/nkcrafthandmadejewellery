const { UserLogHistory } = require("../models/user.model");
const { AdminLogHistory } = require("../models/admin.model");

module.exports = {
    storeUserLog: function (inputs) {
        try {
            const { body, params, query, user, headers } = inputs;
        } catch (error) {
            console.error(error);
        }
    },

    storeAdminLog: function (inputs) {
        try {
            const { body, params, query, user, headers } = inputs;
        } catch (error) {
            console.error(error);
        }
    }
}