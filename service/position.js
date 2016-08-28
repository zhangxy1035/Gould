
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
