const { Schema, model } = require('mongoose'); 
const { bcryptService } = require('../services')

const formKritikSaran = new Schema(
    {
        namaOrangTua: {
            type: String, 
            required: [true, 'Nama Orang Tua is Required'], 
        }, 
        emailOrangTua: { 
            type: String,
            required: [true, 'Email Orang Tua is Required'], 
        }, 
        namaAnak: {
            type: String, 
        }, 
        umurAnak: {
            type: String, 
        },
        message: { 
            type: String, 
            required: [true, 'Pesan Kritik atau Saran is Required'], 
        }
    }, 
    { timestamps: true },
);

module.exports = model('FormKritikSaran', formKritikSaran);