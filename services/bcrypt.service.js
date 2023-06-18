const { genSalt, compare, hash } = require('bcrypt');
const { createHash, randomBytes } = require('crypto');
const {
    helpers: {
      toNumber,
    },
  } = require('../shared');
require('dotenv').config()

const hashPassword = async (password) => {
    const salt = await genSalt(Number.parseInt(process.env.HASH_SALT, 10)); 
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

const comparePassword = async (enteredPassword, originalPassword) => {
    const isMatch = await compare(enteredPassword, originalPassword);
    return isMatch;
};

const getResetPasswordToken = (minutes = 10) => {
    const resetToken = randomBytes(toNumber(process.env.CRYPTO_ROUNDS)).toString('hex');
  
    const resetPasswordToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    const resetPasswordExpire = new Date(Date.now() + minutes * 60 * 1000);
    return {
      resetPasswordToken,
      resetPasswordExpire,
    };
};

const updateResetToken = (resetToken) => {
  const resetPasswordToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');
  return resetPasswordToken;
};

module.exports = {
    hashPassword, 
    comparePassword,
    getResetPasswordToken,
    updateResetToken,
}