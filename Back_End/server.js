var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
var http = require('http').createServer(app);
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('./Public'));
app.use(bodyParser.urlencoded({ extended: true }));
const ecies = require("eth-ecies");
http.listen(process.env.PORT || 5000);
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/medical_blockchain"

async function checkValidity(id,pwd)
{
    let db =  await mongo.connect(url)
    var ans = await db.collection('registration').findOne({"id":id})
    if(ans!=null)
    {
        return ans
    }
    else{
        return "Error"
    }

}

async function checkHospitalValidity(id,pwd)
{
    let db =  await mongo.connect(url)
    var ans = await db.collection('hospitals').findOne({"id":id})
    if(ans!=null)
    {
        return ans
    }
    else{
        return "Error"
    }

}

async function decrypt(privateKey, encryptedData) {
    let userPrivateKey = new Buffer(privateKey, 'hex');
    let bufferEncryptedData = new Buffer(encryptedData, 'base64');
    console.log(userPrivateKey,bufferEncryptedData)

    let decryptedData = ecies.decrypt(userPrivateKey, bufferEncryptedData);
    
    return decryptedData.toString('utf8');
}

async function encrypt(publicKey, data) {
    let userPublicKey = new Buffer(publicKey, 'hex');
    let bufferData = new Buffer(data);

    let encryptedData = ecies.encrypt(userPublicKey, bufferData);

    return encryptedData.toString('base64')
}

async function getPublicKey(patid)
{
    
    var db = await mongo.connect(url)
    var result = await db.collection('registration').findOne({"id":patid})
    var key = result.pbkey;
    return key;
}

async function mapids(hid,patid)
{
        var db = await mongo.connect(url)
        var ans = await db.collection('hospital_patients').findOne({"hospital":hid,"patient":patid})
        if(ans==null)
        {
            var res = await db.collection('hospital_patients').insertOne({"hospital":hid,"patient":patid})
        }
        else{
            var res = "already exists" 
        }
        return res
   
}

app.post('/storekeys/:patientid/:pwd',function(req,res){
    var patid = req.params.patientid;
    var password = req.params.pwd;
    console.log(patid)
    console.log(req.body.value)
    var record = {
        id:patid,
        login_password:password,
        pbkey:req.body.pbkey,
        pvtkey:req.body.value
    }
    mongo.connect(url,function(err,db){
        db.collection('registration').insertOne(record,function(err,result){
            if(err)
            {
                console.log(err)
            }
            else{
                res.send({"response":"success"})
            }
        })
    })

})

app.get('/login/:id/:pwd',async function(req,res){
    var id = req.params.id
    var pwd = req.params.pwd
    var result = await checkValidity(id,pwd)
    res.send({"result":result})
})



app.get('/getHospitals',async function(req,res){
    let rel = new Array()
    let db = await mongo.connect(url)
    var cursor = await db.collection('hospitals').find({})
    cursor.forEach(function(doc,err){
        rel.push({"id":doc.id,
        "pbkey":doc.pbkey})
    })
    setTimeout(function()
    {
        console.log(rel)
        res.send({"result":rel})
    },3000)

})

app.get('/getPatientList/:hospital_id',async function(req,res){
    console.log("triggered")
    let rel = new Array()
    let db = await mongo.connect(url)
    var cursor = await db.collection('hospital_patients').find({})
    cursor.forEach(function(doc,err){
        rel.push(doc.patient)
    })
    setTimeout(function(){
        console.log(rel)
        console.log("sending")
        res.send({"result":rel})
    },3000)
})

app.post('/decryptrecord',async function(req,res){
    var pvtkey = req.body.pvtkey
    var record = req.body.data
    var fans = await decrypt(pvtkey.toString(),record.toString());
    console.log(fans);
    res.send({"decryptedData":fans})

})

app.post('/encryptrecord',async function(req,res){
    var pbkey = req.body.pbkey;
    var record = req.body.data;
    var frec = JSON.stringify(record)
    var ans = await encrypt(pbkey.toString(),frec.toString());
    console.log("in here")
    console.log(ans)
    res.send({"encryptedData":ans})

})

app.post('/hospitalencrypt/:patientid/:hospitalid',async function(req,res){
    console.log("working")
    var publicKey
    var hid = req.params.hospitalid
    var patid = req.params.patientid;
    var pat_record = req.body.pat;
    console.log(req.body.pat)
    var rel = await mapids(hid,patid)
    console.log(rel)
    var pbkey = await getPublicKey(patid);
    console.log(pbkey) 
    var frec = JSON.stringify(pat_record)
    //console.log(JSON.stringify(pat_record))
    console.log(frec.toString())
    var enc_record = await encrypt(pbkey.toString(),frec.toString());
    console.log(enc_record);
    res.send({"result":enc_record})   
})

app.get('/hospitallogin/:id/:pwd',async function(req,res){
    var id = req.params.id
    var pwd = req.params.pwd
    var result = await checkHospitalValidity(id,pwd)
    res.send({"result":result})
})

app.post('/storehospitalkeys/:patientid/:pwd',function(req,res){
    var patid = req.params.patientid;
    var password = req.params.pwd;
    console.log(patid)
    console.log(req.body.value)
    var record = {
        id:patid,
        login_password:password,
        pbkey:req.body.pbkey,
        pvtkey:req.body.value
    }
    mongo.connect(url,function(err,db){
        db.collection('hospitals').insertOne(record,function(err,result){
            if(err)
            {
                console.log(err)
            }
            else{
                res.send({"response":"success"})
            }
        })
    })

})