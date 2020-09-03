const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Siparis = require('./database/models/siparis');
app.post('/siparis', async (req, res) => {
    var siparisDetayNo = await getEnBuyukSiparisDetayNo();
    siparisDetayNo++;
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
        tasimaSekli: req.body.tasimaSekli,
        sektor: req.body.sektor,
        odemeBilgisi: req.body.odemeBilgisi,
        dokumanTuru: req.body.dokumanTuru,
        kopyaAdedi: req.body.kopyaAdedi,
        aciklama: req.body.aciklama,
        faturaFirmasi: req.body.faturaFirmasi,
        aliciFirma: req.body.aliciFirma,
        aciklamalar: req.body.aciklamalar,
        durum: "Yeni Kayıt",
        siparisNo: req.body.siparisNo,
        siparisDetayNo: siparisDetayNo
    })
    yeniSiparis.save()
    .then(() => {
        res.status(201).json({message:'Sipariş kaydedildi.'});
    })
    .catch(err => console.log(err));
})

app.delete('/siparisSil/:siparisDetayNo', (req, res) => {
    var sDetayNo = parseInt(req.params.siparisDetayNo);
    Siparis.findOneAndDelete({siparisDetayNo: {$gte:sDetayNo} }, function (err, docs) { 
        if (err){ 
            console.log(err);
            return res.status(500).json({message:'HATA: Sipariş Silinemedi!'});
        } 
        else{ 
            console.log("Silinen Sipariş: ", docs);
            return res.status(200).json({message:'Sipariş Silindi.'});
        } 
    }); 
})

app.put('/siparisDuzenle/:siparisDetayNo', (req, res) => {
    var sDetayNo = parseInt(req.params.siparisDetayNo);
    Siparis.findOneAndUpdate({siparisDetayNo: sDetayNo },{"$set": {
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
        tasimaSekli: req.body.tasimaSekli,
        sektor: req.body.sektor,
        odemeBilgisi: req.body.odemeBilgisi,
        dokumanTuru: req.body.dokumanTuru,
        kopyaAdedi: req.body.kopyaAdedi,
        aciklama: req.body.aciklama,
        faturaFirmasi: req.body.faturaFirmasi,
        aliciFirma: req.body.aliciFirma,
        aciklamalar: req.body.aciklamalar
        }}).exec(function (err, docs) { 
        if (err){ 
            console.log(err);
            return res.status(500).json({message:'HATA: Sipariş Düzenlenemedi!'});
        } 
        else{ 
            console.log("Düzenlenen Sipariş: ", docs);
            return res.status(200).json({message:'Sipariş Düzenlendi.'});
        } 
    }); 
})

app.post('/cokluSiparis', async (req, res) => {
    console.log("cokluSiparis");
    var siparisDetayNo = await getEnBuyukSiparisDetayNo();
    siparisDetayNo++;
    for(i=0 ; i<req.body.siparisler.length ; i++){
        const yeniSiparis = new Siparis({
            adSoyad: req.body.siparisler[i].adSoyad,
            urun: req.body.siparisler[i].urun,
            urunAciklama: req.body.siparisler[i].urunAciklama,
            teslimSekli: req.body.siparisler[i].teslimSekli,
            paketleme: req.body.siparisler[i].paketleme,
            miktar: req.body.siparisler[i].miktar,
            olcuBirimi: req.body.siparisler[i].olcuBirimi,
            paraBirimi: req.body.siparisler[i].paraBirimi,
            sevkiyatBaslangic: req.body.siparisler[i].sevkiyatBaslangic,
            sevkiyatBitis: req.body.siparisler[i].sevkiyatBitis,
            odemeTuru: req.body.siparisler[i].odemeTuru,
            tasimaSekli: req.body.siparisler[i].tasimaSekli,
            sektor: req.body.siparisler[i].sektor,
            odemeBilgisi: req.body.siparisler[i].odemeBilgisi,
            dokumanTuru: req.body.siparisler[i].dokumanTuru,
            kopyaAdedi: req.body.siparisler[i].kopyaAdedi,
            aciklama: req.body.siparisler[i].aciklama,
            faturaFirmasi: req.body.siparisler[i].faturaFirmasi,
            aliciFirma: req.body.siparisler[i].aliciFirma,
            aciklamalar: req.body.siparisler[i].aciklamalar,
            durum: "Yeni Kayıt",
            siparisNo: req.body.siparisler[i].siparisNo,
            siparisDetayNo: siparisDetayNo
        })
        yeniSiparis.save()
        .then(() => {
            
        })
        .catch(err => console.log(err));
        siparisDetayNo++;
    }
    res.status(201).json({message:'Sipariş kaydedildi.'});
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

async function getEnBuyukSiparisDetayNo(){
    const found = await Siparis.find({}).sort({ siparisDetayNo: -1 }).limit(1);
    console.log(found[0]);
    const biggestsiparisDetayNo = found[0].toObject().siparisDetayNo;
    var temp = parseInt(biggestsiparisDetayNo, 10);
    console.log(temp);
    return temp;
}

app.get('/index', (req, res) => {
    return res.status(201).json({message: 'index.'});
})

app.get('/', (req, res) => {
   return res.send("root");
})

app.listen(process.env.PORT || 3000);