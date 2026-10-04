const bcrypt = require("bcryptjs");

exports.encryptPassword = (password) => {
    return bcrypt.hash(password, 10);
}

exports.comparePassword = (encPassword, password) => {
    return bcrypt.compare(encPassword, password);
}