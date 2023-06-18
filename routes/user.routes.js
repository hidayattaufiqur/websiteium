const router = require('express').Router();
const { 
    userController: {
        getMeHandler,
        loginHandler,
        logoutHandler,
        signUpHandler,
    },
} = require("../controllers");
const { verifyToken } = require("../middlewares");

function userRoutes(expressApp) {

    router.get('/user/me', verifyToken, getMeHandler);

    router.post('/user/', signUpHandler);

    router.post('/user/login', loginHandler);

    router.get('/user/logout', verifyToken, logoutHandler);
    
    expressApp.use('/', router);
}

module.exports = { userRoutes }