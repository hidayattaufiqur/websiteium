const { sign, verify, decode } = require('jsonwebtoken');
const {
  helpers: {
    toNumber,
  },
} = require('../shared');

require('dotenv').config();

const verifyToken = async (token) => {
  const decoded = await verify(token, process.env.JWT_SECRET);
  
  return decoded;
};

const decodeToken = (token) => {
  const decodedToken = decode(token);
  return decodedToken;
};

const signToken = (id) => {
  const token = sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
    issuer: 'NodeJS',
  });

  return token;
};

const getCookieOptions = (req) => {
  const options = {
    secure:
      req?.secure ||
      req?.headers['x-forwarded-proto'] === 'https',
    httpOnly: true,
    maxAge: Date.now() + toNumber(process.env.COOKIE_EXPIRE) * 60 * 60 * 1000,
  };
  return options;
};

module.exports = {
  verifyToken,
  decodeToken,
  signToken,
  getCookieOptions,
};