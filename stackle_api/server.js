const express = require('express');
const app = express();
const path = require('path');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose'); 
var database = require('./config/database');            // load the database config
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var db = mongoose.connection;

app.use('/', express.static(__dirname +  '/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var routes = require('./app/routes')(app,db);


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const hostname = 'localhost';

mongoose.connect(database.url,function(err){
    console.log("Connecting to the database..");
    if(err){
        mongoose.connect(database.alturl,function(err){
            return console.log(err);
        })
        return console.log("Couldnt connect to db url 1. connecting to alternate");
    }else{
        console.log("Mongo connect sucess!");
    }
    
    app.listen(port, function(){
        console.log("App listening on port " + port);
    });
    
});     // connect to mongoDB database on modulus.io
   
  

