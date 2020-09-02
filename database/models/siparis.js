const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siparisSchema = new Schema({
    adSoyad: {
        type: String,
        required: true,
    },
    siparisNo: {
        type: Number,
        //required: true
    },
    siparisDetayNo: {
        type: Number,
        unique: true,
        //required: true
    },
    urun: {
        type: String,
        required: true
    },
    urunAciklama: {
        type: String
    },
    teslimSekli: {
        type: String,
        required: true
    },
    paketleme: {
        type: String,
        required: true
    },
    miktar: {
        type: Number,
        required: true
    },
    olcuBirimi: {
        type: String
    },
    paraBirimi: {
        type: String,
        required: true
    },
    sevkiyatBaslangic: {
        type: Date,
        required: true
    },
    sevkiyatBitis: {
        type: Date,
        required: true
    },
    odemeTuru: {
        type: String,
        required: true
    },
    tasimaSekli: {
        type: String,
        required: true
    },
    sektor: {
        type: String,
        required: true
    },
    odemeBilgisi: {
        type: String
    },
    dokumanTuru: {
        type: String
    },
    kopyaAdedi: {
        type: Number
    },
    aciklama: {
        type: String
    },
    faturaFirmasi: {
        type: String,
        required: true
    },
    aliciFirma: {
        type: String,
        required: true
    },
    aciklamalar: {
        type: String
    },
    durum: {
        type: String
    }
},{
    timestamps: true
})

siparisSchema.statics.findMaxsiparisDetayNo = async function () {
    const found = await this.find({}).sort({ siparisDetayNo: -1 }).limit(1);

    const biggestsiparisDetayNo = found[0].toObject().siparisDetayNo;
    return parseInt(biggestsiparisDetayNo, 10);
};


siparisSchema.statics.findMaxsiparisNo = async function () {
    const found = await this.find({}).sort({ siparisNo: -1 }).limit(1);

    const biggestsiparisNo = found[0].toObject().siparisNo;
    return parseInt(biggestsiparisNo, 10);
};


siparisSchema.pre("save", async function (next) {
    const doc = this;

    //find the biggest
    const biggestsiparisDetayNo = await Siparis.findMaxsiparisDetayNo();
    const biggestsiparisNo = await Siparis.findMaxsiparisNo();

    doc.siparisNo = biggestsiparisNo + 1;
    doc.siparisDetayNo = biggestsiparisDetayNo + 1;

    next();
});

const Siparis = mongoose.model('Siparis', siparisSchema, 'Siparisler');

module.exports = Siparis;