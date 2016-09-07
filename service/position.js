
var sql = require('mysql');
var connection = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'zhang123',
    database:'test'
});
connection.connect();
/**
 * 获取所有标记点
 * @param req
 * @param res
 */
exports.getAllMarker = function(req,res) {
    console.log('获取所有标记点服务器端');
    console.log(req.body);

    var con = connection.query("select * from new_1",function(err,result,fields){
        if(err){
            throw err;
        }
        console.log("rows",result[0].site_id);
        var new_1 = [];
        result.forEach(function (item) {
            var new_1item = {
                site_id: item.site_id,
                lng: item.lng,
                lat: item.lat
            };
            new_1.push(new_1item);
        });
        console.log("rowsss",new_1);
        res.send({retCode:1,data:new_1});
    })

};

exports.getAllMarker4 = function(req,res) {
    var order_id = req.body.order_id;
    console.log('获取所有标记点服务器端');
    console.log(req.body);

    var con = connection.query("SELECT * FROM new_3 n3 ,sample s WHERE s.addr=n3.shop_id AND order_id='"+order_id+"'",function(err,result,fields){
        if(err){
            throw err;
        }
        var new_3 = [];
        result.forEach(function (item) {
            var new_1item = {
                order_id:item.Order_id,
                shop_id:item.shop_id,
                courier_id: item.Courier_id,
                addr: item.Addr,
                arrival_time: item.arrival_time,
                departure:item.departure,
                amount:item.amount,
                lng:item.lng,
                lat:item.lat

            };
            new_3.push(new_1item);
        });
        console.log(new_3);
        res.send({retCode:1,data:new_3});
    })

};