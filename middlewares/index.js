const { verifyToken } = require('./verifyToken');
const { storage }  = require('./multer');

module.exports = {
    verifyToken,
    storage,
}