const { Schema, model } = require('mongoose'); 
const { bcryptService } = require('../services')

const formPendaftaranSchema = new Schema(
    {
        namaOrangTua: {
            type: String, 
            required: [true, 'Nama Orang Tua is Required'], 
        }, 
        emailOrangTua: { 
            type: String,
            required: [true, 'Email Orang Tua is Required'], 
        }, 
        nomorHpOrangTua: {
            type: String, 
            required: [true, 'No HP Orang Tua is Required'], 
        }, 
        namaAnak: {
            type: String, 
            required: [true, 'Nama Anak is Required'], 
        }, 
        umurAnak: {
            type: String, 
            required: [true, 'Umur Anak is Required'], 
        },
        terimaBeasiswa: {
            type: String, 
            required: [true, 'Status Beasiswa is Required'], 
        }, 
        fileFormulir: { 
            type: String, 
            required: [true, 'File Formulir Pendaftaran is Required'], 
        }
    }, 
    { timestamps: true },
);

module.exports = model('Form', formPendaftaranSchema);