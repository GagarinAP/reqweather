var express = require('express');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  request('http://api.openweathermap.org/data/2.5/weather?q=Dakar,sn&appid=61fcce5990843ee68faf88af27178d3a', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var parseBody = JSON.parse(body);      
    var data = {
      city: parseBody.name,   
      temperature: (parseBody.main.temp-273).toFixed(0),
    }
    res.render('index', { city: data.city, temp: data.temperature });     
  }});  
});

app.listen(3000, ()=>{
  console.log('App run in 3000 port');
})