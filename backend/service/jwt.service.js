const tokenHandler = require("jsonwebtoken");
const { TOKEN_OPTIONS, TOKEN_EXPIRY_OPTIONS } = require("../lib/helper.lib");

exports.generateToken = (payload, option = TOKEN_OPTIONS.USER) => {
    return tokenHandler.sign(payload, process.env[option], { algorithm: "RS256", expiresIn: TOKEN_EXPIRY_OPTIONS[option] });
}

exports.verifyToken = (token, option = TOKEN_OPTIONS.USER) => {
    return tokenHandler.verify(token, process.env[option]);
}