const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { storage } = require('../middlewares');
const { verifyToken } = require("../middlewares");

const { 
    viewController: {
        registerHandler,
        kritikHandler, 
        dashboardHandler
        },
} = require("../controllers");

const upload = multer({ storage: storage });

function viewRoutes(expressApp) {

    // GET
    router.get('/beranda', async(req, res) => { 
        res.render('../views/index');
    });

    router.get('/sejarah', async(req, res) => { 
        res.render('../views/about');
    });

    router.get('/visi_misi', async(req, res) => { 
        res.render('../views/visi_misi');
    });

    router.get('/organisasi', async(req, res) => { 
        res.render('../views/organisasi');
    });

    router.get('/kegiatan', async(req, res) => { 
        res.render('../views/kegiatan');
    });

    router.get('/guru', async(req, res) => { 
        res.render('../views/guru');
    });

    router.get('/contact', async(req, res) => { 
        res.render('../views/contact');
    });

    router.get('/registrasi', async(req, res) => { 
        res.render('../views/registrasi');
    });

    router.get('/login', async(req, res) => { 
        res.render('../views/login');
    });

    router.get('/dashboard', verifyToken, dashboardHandler);

    // POST 
    router.post('/register', upload.single('fileFormulir'), registerHandler);

    router.post('/kritiksaran', kritikHandler);

    expressApp.use('/', router);
}

module.exports = { viewRoutes }