var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var position = require('./position');

app.set('port', process.env.PORT || 9909);
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../web')));

app.use(express.static(path.join(__dirname, '../app')));
app.post('/getAllMarker',position.getAllMarker);

app.listen(app.get('port'),function(){
    console.log('成功开启node,端口号:'+app.get('port'));
});

process.on('uncaughtException', function (err) {
    console.log(err);
});