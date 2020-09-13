var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patient_details");
  dbo.collection("patient").findOne({"patient_id":"abc"}, function(err, result) {
    if (err) throw err;
    console.log(result.public_key);
    var a = result.public_key;
    console.log(a);
    db.close();
  });
}); 