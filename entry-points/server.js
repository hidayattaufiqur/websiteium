const express = require('express');
const { userRoutes, viewRoutes } = require('../routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

async function startServer() {
    const expressApp = express();
    expressApp.set("view engine", "ejs");
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    expressApp.use(cookieParser());
    expressApp.use('/public', express.static(path.resolve(__dirname, '../public')));
    expressApp.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] , credentials: true }));
    userRoutes(expressApp);
    viewRoutes(expressApp);
    const port = process.env.PORT || 4000 
    expressApp.listen(port, () => {
        console.log(`Server is listening to port '${port}'.`);
    });
};

module.exports = { startServer };