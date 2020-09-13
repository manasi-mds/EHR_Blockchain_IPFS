var express = require('express');
var app = express();
var cors = require('cors');
const ecies = require("eth-ecies");
const util = require('ethereumjs-util')
var StringDecoder = require('string_decoder').StringDecoder;
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
http.listen(process.env.PORT || 5000);
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/medical_blockchain";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));;
var ans

function encrypt(publicKey, data) {
    let userPublicKey = new Buffer(publicKey, 'hex');
    let bufferData = new Buffer(data);

    let encryptedData = ecies.encrypt(userPublicKey, bufferData);

    return encryptedData.toString('base64')
}


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.post('/hospital/:patientid',async function(req,res){
    console.log("working")
    var publicKey
    
    var patid = req.params.patientid;
    var pat_record = req.body.pat;
    console.log(req.body.pat)
    mongo.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("patient_details");
        dbo.collection("patient").findOne({"patient_id":patid}, function(err, result) {
            if(err)
            {
                console.log(err)
            }
            else{
                //console.log(result.public_key);
                publicKey = result.public_key;
                ans = encrypt(publicKey.toString(),pat_record.toString());
                console.log(publicKey)
                console.log(ans)
                db.close();
                res.send({"result":ans})
            }
        })
    })    
    //res.send({"result":"working"})
})

/*app.get('/hospital/grecord',function(req,res){
    console.log("in testing")
    
})*/
