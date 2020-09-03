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
        siparisNo: req.body.siparisNo
    })
    yeniSiparis.save()
    .then(() => {
        res.status(201).json({message:'Sipariş kaydedildi.'});
    })
    .catch(err => console.log(err));
})

app.post('/cokluSiparis', (req, res) => {
    console.log("cokluSiparis");
    //const yeniSiparisler = [];
    //console.log(req.body.length);
    for(i=0 ; i<req.body.length ; i++){
        console.log(req.body[i].adSoyad);
        const yeniSiparis = new Siparis({
            adSoyad: req.body[i].adSoyad,
            urun: req.body[i].urun,
            urunAciklama: req.body[i].urunAciklama,
            teslimSekli: req.body[i].teslimSekli,
            paketleme: req.body[i].paketleme,
            miktar: req.body[i].miktar,
            olcuBirimi: req.body[i].olcuBirimi,
            paraBirimi: req.body[i].paraBirimi,
            sevkiyatBaslangic: req.body[i].sevkiyatBaslangic,
            sevkiyatBitis: req.body[i].sevkiyatBitis,
            odemeTuru: req.body[i].odemeTuru,
            tasimaSekli: req.body[i].teslimSekli,
            sektor: req.body[i].sektor,
            odemeBilgisi: req.body[i].odemeBilgisi,
            dokumanTuru: req.body[i].dokumanTuru,
            kopyaAdedi: req.body[i].kopyaAdedi,
            aciklama: req.body[i].aciklama,
            faturaFirmasi: req.body[i].faturaFirmasi,
            aliciFirma: req.body[i].aliciFirma,
            aciklamalar: req.body[i].aciklamalar,
            durum: "Yeni Kayıt",
            siparisNo: req.body[i].siparisNo,
            siparisDetayNo: req.body[i].siparisDetayNo
        })
        yeniSiparis.save()
        .then(() => {
            
        })
        .catch(err => console.log(err));
    }
    res.status(201).json({message:'Sipariş kaydedildi.'});
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

app.get('/siparisDon/:index', (req, res) => {
    Siparis.find({})
        .then(siparis => {
            return  res.status(200).json(siparis[req.params.index]);
            //console.log(siparis[req.params.index]);
        })
})

app.get('/siparisler', (req, res) => {
    Siparis.find()
        .then(siparis => {
            return res.json({"siparisler":siparis});
        })
})

app.get('/enBuyukSiparisNo', async (req, res) => {
    const found = await Siparis.find({}).sort({ siparisNo: -1 }).limit(1);
    const biggestsiparisNo = found[0].toObject().siparisNo;
    var temp = parseInt(biggestsiparisNo, 10);
    return res.json({enBuyukSiparisNo: temp});
})

app.get('/enBuyukSiparisDetayNo', async (req, res) => {
    const found = await Siparis.find({}).sort({ siparisDetayNo: -1 }).limit(1);
    const biggestsiparisDetayNo = found[0].toObject().siparisDetayNo;
    var temp = parseInt(biggestsiparisDetayNo, 10);
    return res.json({enBuyukSiparisDetayNo: temp});
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