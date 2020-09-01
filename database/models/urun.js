const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urunSchema = new Schema({
    isim: {
        type: String,
        required: true,
        unique: true
    },
    miktar: {
        type: Number,
        required: true
    },
    birim: {
        type: String,
        required: true
    }
    
})

const Urun = mongoose.model('Ürün', urunSchema, 'Ürünler');

module.exports = Urun;