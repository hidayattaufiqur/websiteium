const { HttpStatus } = require('../constants');
const { userSchema } = require('../models');
const { jwtService } = require('../services');

const User = userSchema;

const verifyToken = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res 
      .status(HttpStatus.UNAUTHORIZED)
      .json({ statusCode: HttpStatus.UNAUTHORIZED, msg: 'Not logged in' })
    }
    
    const decoded = await jwtService.verifyToken(token);
    if (!decoded || !decoded.id) {
      return res 
      .status(HttpStatus.UNAUTHORIZED)
      .json({ statusCode: HttpStatus.UNAUTHORIZED, msg: 'Unauthorized' })
    }
    
    const currentUser = await User.findById(decoded?.id);
    if (!currentUser) {
      return res 
      .status(HttpStatus.UNAUTHORIZED)
      .json({ statusCode: HttpStatus.UNAUTHORIZED, msg: 'Unauthorized' })
    }
    
    req.user = currentUser;
    res.locals.user = currentUser;
    
    return next();
};


module.exports = {
    verifyToken,
};
  