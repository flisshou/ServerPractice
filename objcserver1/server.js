var express = require('express');
var bodyParser = require('body-Parser');
var app = express();

app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// var tutorials = [
//   {
//     id : 1,
//     description : "desc 1",
//     iframe : "iframe 1",
//     thumbnail : "~~~",
//   },
//   {
//     id : 2,
//     description : "desc 2",
//     iframe : "iframe 2",
//     thumbnail : "~/~/~/~"
//   }
// ];

var employee = [
  {
    status : "---",
    employ_id : 12345,
    name : "Fliss",
    date : "Oct 10, 2016",
    available_time : {
      start : 09,
      end : 17
    },
    assigned_time : {
      start : 00,
      end : 00
    }
  }
];

var replies = [
  {
    username : "Fliss",
    wtf : "Yo yo yo yo yo"
  }
];

app.post('/replies', function(req, res){
  var theReply = req.body;
  if (theReply){
    if (theReply.username && theReply.wtf){
      reply.push(theReply);
    } else {
      res.send("You are weird. ");
    }
  } else {
    res.send("Where is the data");
  }

  res.send("Everything is so good!!!!!!!!");
    console.log(replies);
});

// app.put('/replies', function(req, res){
//   var someOBJ = req.body;
//
//   var theID = someOBJ.uniqueID;
//
//   //Talk to the database, find the record by the id
//   //then you replace the existing record with req.body
//
//   res.send("Sucessfully updated!");
//
// });

app.get('/employee', function(req, res){
  console.log("GET from server");


  res.send(employee);
});

app.listen(5020);

//
//
//
//
//
//
//
//
//
//
