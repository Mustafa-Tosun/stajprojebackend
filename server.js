const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const Siparis = require('./database/models/siparis');
app.post('/siparis', (req, res) => {
    const yeniSiparis = new Siparis({
        adSoyad: req.body.adSoyad,
        urun: req.body.urun,
        urunAciklama: req.body.urunAciklama,
        teslimSekli: req.body.teslimSekli,
        paketleme: req.body.paketleme,
        miktar: req.body.miktar,
        olcuBirimi: req.body.olcuBirimi,
        paraBirimi: req.body.paraBirimi,
        sevkiyatBaslangic: req.body.sevkiyatBaslangic,
        sevkiyatBitis: req.body.sevkiyatBitis,
        odemeTuru: req.body.odemeTuru,
        tasimaSekli: req.body.teslimSekli,
        sektor: req.body.sektor,
        odemeBilgisi: req.body.odemeBilgisi,
        dokumanTuru: req.body.dokumanTuru,
        kopyaAdedi: req.body.kopyaAdedi,
        aciklama: req.body.aciklama,
        faturaFirmasi: req.body.faturaFirmasi,
        aliciFirma: req.body.aliciFirma,
        aciklamalar: req.body.aciklamalar,
        durum: "Yeni Kayıt",
        siparisNo: 22,
        siparisDetayNo: 22
    })
    yeniSiparis.save()
    .then(() => {
        res.status(201).json({message:'Sipariş kaydedildi.'});
    })
    .catch(err => console.log(err));
})

const tempSiparis = require('./database/models/tempSiparis');
app.post('/tempSiparis', (req, res) => {
    const yeniSiparis = new tempSiparis({
        adSoyad: req.body.adSoyad,
        urun: req.body.urun,
        urunAciklama: req.body.urunAciklama,
        teslimSekli: req.body.teslimSekli,
        paketleme: req.body.paketleme,
        miktar: req.body.miktar,
        olcuBirimi: req.body.olcuBirimi,
        paraBirimi: req.body.paraBirimi,
        sevkiyatBaslangic: req.body.sevkiyatBaslangic,
        sevkiyatBitis: req.body.sevkiyatBitis,
        odemeTuru: req.body.odemeTuru,
        tasimaSekli: req.body.teslimSekli,
        sektor: req.body.sektor,
        odemeBilgisi: req.body.odemeBilgisi,
        dokumanTuru: req.body.dokumanTuru,
        kopyaAdedi: req.body.kopyaAdedi,
        aciklama: req.body.aciklama,
        faturaFirmasi: req.body.faturaFirmasi,
        aliciFirma: req.body.aliciFirma,
        aciklamalar: req.body.aciklamalar,
        durum: "Yeni Kayıt"
    })
    yeniSiparis.save()
    .then(() => {
        res.status(201).json({message:'Geçici sipariş kaydedildi.'});
    })
    .catch(err => console.log(err));
})

app.post('/kontrolSiparisNo', (req, res) => {
    Siparis.findOne({'siparisNo': req.body.siparisNo}, function(err,result){
        if(result){
           return res.status(402).json({message:"Sipariş Numarası önceden kayıtlı!"});
        }
        return res.status(200).json({message:"Sipariş numarası kayıtlı değil"});
    })
})

app.get('/siparisler', (req, res) => {
    Siparis.find()
        .then(siparis => {
            return res.json({"siparisler":siparis});
        })
})

app.get('/tempSiparisler', (req, res) => {
    tempSiparis.find()
        .then(tempSiparis => {
            return res.json({"tempSiparisler":tempSiparis});
        })
})

app.get('/index', (req, res) => {
    return res.status(201).json({message: 'index.'});
})

app.get('/', (req, res) => {
   return res.send("root");
})

app.listen(process.env.PORT || 3000);