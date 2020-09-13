
var mongo = require('mongodb').MongoClient;
var url = "mongodb://gagan:gagan6797@ds249092.mlab.com:49092/medical_blockchain"

async function func()
{
    var db = await mongo.connect(url);
    // for(var i = 0 ; i < 10000 ; i++)
    // {
    //     db.collection('test4').insertOne({"key":i,"value":"{name:hahah,age:10,diagnosis:dfsfsdfsddffffffffffhhhhhhhfhgdfdwwefewtreh}"})
    // }
    // for(var i = 0 ; i < 100 ; i++)
    // {
    //     db.collection('test').insertOne({"key":i,"value":"{name:hahah,age:10,diagnosis:dfsfsdfsddfffffffffffffffffffffffffffffffffffffgsssssssssgfdvbdfbhgfhdwwwwwwwwfasfadgafghhhhhhhfhgdfdwwefewtreh}"})
    // }
    // for(var i = 0 ; i < 500 ; i++)
    // {
    //     db.collection('test1').insertOne({"key":i,"value":"{name:hahah,age:10,diagnosis:dfsfsdfsddfffffffffffffffffffffffffffffffffffffgsssssssssgfdvbdfbhgfhdwwwwwwwwfasfadgafghhhhhhhfhgdfdwwefewtreh}"})
    // }
    // for(var i = 0 ; i < 1000 ; i++)
    // {
    //     db.collection('test2').insertOne({"key":i,"value":"{name:hahah,age:10,diagnosis:dfsfsdfsddfffffffffffffffffffffffffffffffffffffgsssssssssgfdvbdfbhgfhdwwwwwwwwfasfadgafghhhhhhhfhgdfdwwefewtreh}"})
    // }
    // for(var i = 0 ; i < 5000 ; i++)
    // {
    //     db.collection('test3').insertOne({"key":i,"value":"{name:hahah,age:10,diagnosis:dfsfsdfsddfffffffffffffffffffffffffffffffffffffgsssssssssgfdvbdfbhgfhdwwwwwwwwfasfadgafghhhhhhhfhgdfdwwefewtreh}"})
    // }
    

    
    var t0 = process.hrtime()
    var rel1 = await db.collection('test2').findOne({"key":0})
    var hrend = process.hrtime(t0);

    console.log("test2:",hrend[1]/1000000);

    
    var t0 = process.hrtime()
    var rel = await db.collection('test').findOne({"key":0})
    var hrend = process.hrtime(t0);
 
    console.log("test:",hrend[1]/1000000);
    
    
    var t0 = process.hrtime()
    var rel1 = await db.collection('test1').findOne({"key":0})
    var hrend = process.hrtime(t0);

    console.log("test1:",hrend[1]/1000000);
    var t0 = process.hrtime()
    var rel1 = await db.collection('test3').findOne({"key":0})
    var hrend = process.hrtime(t0);

    console.log("test3:",hrend[1]/1000000);
    
    var t0 = process.hrtime()
    var rel1 = await db.collection('test4').findOne({"key":0})
    var hrend = process.hrtime(t0);

    console.log("test4:",hrend[1]/1000000);
}
func();