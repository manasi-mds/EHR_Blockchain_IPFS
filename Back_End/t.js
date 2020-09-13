var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
app.use(express.static('./Public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
http.listen(process.env.PORT || 4000);
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var url = "mongodb://droidhomesuser:droidhomesuser02@localhost:27017/droidhomesdb";


//application API

app.post('/app/analytics/info/:query', function (req, res) {
    var cid = req.params.query;
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    res.json({
        "month": month,
        "year": year
    })
})

app.post('/app/analytics/date/:query', function (req, res) {
    //console.log("post request received");
    var result = [];
    var cid = req.params.query;
    //console.log(cid);
    //console.log(typeof cid);
    var fulldate = req.body.date;
    mongo.connect(url, function (err, db) {
        db.collection('rooms').find({ "customer_id": ObjectID(cid) }, function (err, cursor) {
            //console.log("record found");
            //console.log(cursor);
            cursor.forEach(function (doc, err) {
                //console.log("inside cursor");
                console.log(doc._id);
                result.push(doc._id);
            })
            setTimeout(delay, 500)
            function delay() {
                res.json({
                    "result": result,
                    "date": fulldate
                });
            }
        })

    })
})

app.post('/app/analytics/room/:query', function (req, res) {
    var result = [];
    var cid = req.params.query;
    var rmid = req.body.room_id;
    var date = req.body.date;
    mongo.connect(url, function (err, db) {
        db.collection('modules').find({ "room_id": ObjectID(rmid) }, function (err, cursor) {
            cursor.forEach(function (doc, err) {
                // console.log(doc._id);
                result.push(doc.module_name);
            })
            setTimeout(delay, 200)
            function delay() {
                res.json({
                    "result": result,
                    "date": date
                });
            }
        })

    })
})

app.post('/app/analytics/module/:query', function (req, res) {
    var result = [];
    var times = [];
    var k = 0;
    var mid = req.body.module_name;
    var cid = req.params.query;
    var date = req.body.date;
    var datefinal = new Date(date + "T00:00:00.000Z")
    var month = datefinal.getMonth();
    var year = datefinal.getFullYear();
    var day = datefinal.getDate();
    console.log(month, year, day)
    var date2 = new Date(year, month, day + 1);
    console.log(date2);

    console.log(datefinal);
    var str = "F;" + mid;
    mongo.connect(url, function (err, db) {


        db.collection('messages').find({ "feedback": { $regex: "^" + str + ".*" }, "updated": { "$gte": datefinal, "$lt": date2 }, "customer_id": ObjectID(cid) }, function (err, cursor) {
            cursor.forEach(function (doc, err) {
                result.push(doc)

            })
            setTimeout(ddelay, 300)
            function ddelay() {
                console.log(result);
                db.collection('modules').findOne({ "module_name": mid }, function (err, resl) {
                    var sno = resl.no_of_switches;
                    var len = result.length;
                    for (var i = 4; i < (4 + sno); i++) {
                        times[i - 4] = 0;
                        for (j = 0; j < len; j++) {
                            if (Number(result[j].feedback[i]) == 1) {
                                for (l = i + 1; l < len; l++) {
                                    if (Number(result[l].feedback[i]) == 0) {
                                        var h1 = result[l].updated.getHours()
                                        var h2 = result[j].updated.getHours()
                                        var m1 = result[l].updated.getMinutes()
                                        var m2 = result[j].updated.getMinutes()
                                        times[i - 4] += ((h1 - h2) * 60) + (m1 - m2)
                                        j = j + l;
                                        break;

                                    }
                                }
                            }

                        }

                    }
                    for (var i = 4; i < (4 + sno); i++) {
                        var count = 0;
                        for (j = 0; j < len; j++) {
                            if(Number(result[j].feedback[i])==0)
                            {
                                count = 1;
                                break;
                            }

                        }
                        if(count==0)
                        {
                            times[i-4]=24*60;
                        }
                    }

                    res.json(times);
                })
            }



        })
    })
})
