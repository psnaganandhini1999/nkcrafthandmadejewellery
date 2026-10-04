const { TOKEN_OPTIONS } = require('../lib/helper.lib');
const jwtService = require('../service/jwt.service');

const tokenMiddleware = function (option = TOKEN_OPTIONS.USER) {
  return (req, res, next) => {
    const { headers } = req;
    let token = headers.authorization;
    if (!token)
      return res.status(401).send({ status: false, message: "Authentication token required" });

    if (token.startsWith("Bearer "))
      token = token.replace("Bearer ", "");

    if (!token)
      return res.status(401).send({ status: false, message: "Authentication token required" });

    try {
      const decoded = jwtService.verifyToken(token, option);
      req.user = decoded;
      next();
    } 
    catch (error) {
      console.error(error);
      res.status(401).json({ status: false, message: "Session expired" });
    }
  }
};

const checkPermission = function (req, res, next) {
  const user = req.user;
  let auth = false;
  const { method } = req;
  switch(method.toUpperCase()) {
    case "GET":
      auth = user["1"] === true;
      break;

    case "POST":
      auth = user["2"] === true;
      break;

    case "PUT":
    case "PATCH":
      auth = user["3"] === true;
      break;

    case "DELETE":
      auth = user["4"] === true;
      break;

    default:
      break;
  }

  if (!auth) {
    return res.status(402).send({
      status: false,
      message: "Not Authorized"
    })
  }

  return next();
}

module.exports = { 
  protect: tokenMiddleware,
  protect1: checkPermission 
};
