var express = require('express');
var bodyParser = require('body-Parser');
var app = express();


//accept all the requests
//req: request;		res: response;		next: the next middle ware
app.all('/*', function(req, res, next) {
	 res.header("Access-Control-Allow-Origin", "*");
	 res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
	 res.header("Access-Control-Allow-Methods", "POST, GET");
	 next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//JSON array
var tutorials = [
	{
		id : 1,
		title : "Android Studio Tutorial For Beginners",
		description : "Learn how to install Android Studio and then go through this tutorial to build your very first app",
		iframe : "~~~",
		thumbnail : "~~~"
	},
	{
		id : 2,
		title : "~~~~",
		description : "~~~",
		iframe : "~~~",
		thumbnail : "~~~"
	}
];



app.get('/tutorials', function (req, res) {
	console.log("GET from server");
	res.send(tutorials);
});

app.listen(5000);





















