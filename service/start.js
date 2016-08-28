/**
 * Created by ourway on 16/6/8.
 *
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//log信息(自定义文件)
var position = require('./position');

app.set('port', process.env.PORT || 9909);
app.use(bodyParser.urlencoded({ extended: false })) ;// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
//web应用目录
app.use(express.static(path.join(__dirname, '../web')));
//app目录为浏览器端调试时用，亦为应用更新目录。第一版可不加，以后更新必加
app.use(express.static(path.join(__dirname, '../app')));
app.post('/getAllMarker',position.getAllMarker);

app.listen(app.get('port'),function(){
    console.log('成功开启node,端口号:'+app.get('port'));
});

process.on('uncaughtException', function (err) {
    console.log(err);
});