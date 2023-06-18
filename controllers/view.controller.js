const { formSchema, formKritikSaranSchema } = require('./../models');
const { HttpStatus } = require('../constants');

const Form = formSchema; 
const FormKritik = formKritikSaranSchema; 

exports.registerHandler = async (req, res) => { 
    const fileFormulirPath = req.file.filename;
    console.log(req.file)

    const { 
        namaOrangTua, emailOrangTua, nomorHpOrangTua, namaAnak,
        umurAnak, terimaBeasiswa, fileFormulir} = req.body;
    try {
        await Form.create({
            namaOrangTua, emailOrangTua, nomorHpOrangTua, namaAnak,
            umurAnak, terimaBeasiswa, fileFormulir: fileFormulirPath
        });

    } catch (error) {
        console.error(error);
        HttpStatus.INTERNAL_SERVER_ERROR;
      }
};

exports.kritikHandler = async (req, res) => { 
    const { 
        namaOrangTua, emailOrangTua, namaAnak,
        umurAnak, message
    } = req.body;

    await FormKritik.create({ 
        namaOrangTua, emailOrangTua, namaAnak,
        umurAnak, message
    });
}

exports.dashboardHandler = async (req, res) => { 
    try {
        const totalMessages = await FormKritik.countDocuments();
        const totalRegistrants = await Form.countDocuments();
        
        const messages = await FormKritik.find().sort({ createdAt: -1 });
        const registrants = await Form.find().sort({ createdAt: -1 });
        
        res.render('dashboard', {
          totalMessages,
          totalRegistrants,
          messages,
          registrants
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}