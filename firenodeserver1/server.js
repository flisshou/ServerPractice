/*Frameworks Initialization*/

var express = require('express');
var bodyParser = require('body-Parser');
var app     = express();
//
// /*Socket Initialization*/
// var sckio   = require('socket.io')(app);
// app.listen(5880);

/*Database Initialization*/
var firebase = require('firebase');

//
// /*Server Configuration*/
// app.configuration(function(){
//   app.use(express.cookieParser());
//   app.use(express.session({secret : 'secret', key : 'express.sid'}));
//   app.use(function(req, res){
//     res.send('<h2>Hello! your session id is ' + req.sessionID + '</h2>');
//   });
// });

/*Building app functions*/
app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*Initialize the app with a service account, granting admin privileges*/
firebase.initializeApp({
    databaseURL : "https://tryfirebase-746a9.firebaseio.com/",
    serviceAccount : "/Users/flisshou/Desktop/ServerPractice/firenodeserver1/TryFirebase-173be2881a47.json"
});

/*As an admin, the app has access to read and write all data, regardless of Security Rules */
var db = firebase.database();

var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val()); ///null
  console.log("db");
});

/*Save data to Firebase*/
var saveDataRef = db.ref("testdata/cplex");//to make nodes in db
var usersRef    = saveDataRef.child("users");
var dataArray   = [{
  cplex_employees_parameters : {

    "employee_1" : [1, 0, 1, 0],
    "employee_2" : [1, 1, 1, 0],
    "employee_3" : [0, 1, 0, 0],
    "employee_4" : [1, 0, 0, 0],
    "employee_5" : [0, 1, 1, 0]

  },
  cplex_managers_parameters : {

    "weekly_bounds" : {
      "Wmin" : 0,
      "Wmax" : 8
    },
    "dailly_bounds" : {
      "Dmin" : 7,
      "Dmax" : 15
    }

  },
  cplex_alternative_parameters : {

    "employee_1" : [
      {"start" : "0700", "end" : "1400"},
      {"start" : "0700", "end" : "1400"}
    ],
    "employee_2" : [
      {"start" : "0700", "end" : "2200"},
      {"start" : "0700", "end" : "1400"}
    ],
    "employee_3" : [
      {"start" : "1400", "end" : "2200"},
      {"start" : "0000", "end" : "0000"}
    ],
    "employee_4" : [
      {"start" : "0700", "end" : "1400"},
      {"start" : "0000", "end" : "0000"}
    ],
    "employee_5" : [
      {"start" : "1400", "end" : "2200"},
      {"start" : "0700", "end" : "1400"}
    ],

  }
}];




// var dataArray   = [{
//   SiangLin  : {
//     date_of_birth : "Jan 1, 1990",
//     full_name     : "Sheng Siang Lin"
//   },
//   FrankWang : {
//     date_of_birth : "Feb 2, 1990",
//     full_name     : "You Siang Wang"
//   },
//   FlissHou  : {
//     date_of_birth : "Mar 3, 1990",
//     full_name     : "Ya Fang Hou"
//   },
//   GaryYeh   : {
//     date_of_birth : "Apr 4, 1990",
//     full_name     : "How Ping Yeh"
//   }
// }];

usersRef.set(dataArray);

/*Retrieve Data from Firebase*/

// var retrieveDataRef = db.ref("server/saving-data/fireblog");
// retrieveDataRef.on("value", function(snapshot){
//   console.log(snapshot.val());
// }, function (errObject){
//   console.log("The read failed: " + errObject.code);
// });
var retrieveDataRef = db.ref("test/cplex/");
retrieveDataRef.on("value", function(snapshot){
  console.log(snapshot.val());
}, function(errObject){
  console.log("The read failed: " + errObject.code);
}
);





/*Listener*/
app.get('/tryfirebase', function(req, res) {
  console.log("GET from server ...");
  res.send(dataArray);
});

app.listen(5880);


//
// sckio.on('connection', function(socket) {
//   socket.emit('news', {Hello : "World"});
//   socket.on('my other event', function(data) {
//     console.log(data);
//   });
// });
