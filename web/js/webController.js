angular.module('PCMapInput',['PCFactory'])
    .constant("CONFIG",{
        host: "http://192.168.1.103:9909",//本机测试地址(可变)
        version:'1.0.0'//版本
    })
    .controller('new4Ctrl',function($scope,Position){
        var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 10,
            center: [121.48,31.22]//定位到上海
        });
        AMap.plugin('AMap.ToolBar',function(){
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar)
        })
        var order_id=$scope.order_id;
        //自定义搜索
        $scope.mapSearch = function () {
            //自定义搜索
            if ($scope.order_id) {
                Position.getAllMarker4({order_id: $scope.order_id}, function (data) {
                    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                    console.log(data.data[0]);
                    order_id = data.data[0].order_id;
                    var shop_id = data.data[0].shop_id;
                    var lng = data.data[0].lng;
                    var lat = data.data[0].lat;
                    var courier_id = data.data[0].courier_id;
                    var amount = data.data[0].amount;
                    var time = data.data[0].arrival_time + data.data[0].departure;
                    var marker = new AMap.Marker({
                        position: [lng, lat],
                        map: map
                    });
                    marker.content = 'Courier' +' '+ (courier_id) +' '+ 'In outlets' +' '+ (shop_id) +' '+ 'spend' +' '+ (time)  +' '+ 'Minutes, take pieces' +' '+ (amount) +' '+'Order number:' +' '+ (data.data[0].order_id);
                    marker.on('click', markerClick);
                    marker.emit('click', {target: marker});

                    function markerClick(e) {
                        infoWindow.setContent(e.target.content);
                        infoWindow.open(map, e.target.getPosition());
                    }

                    map.setFitView();

                });
            } else {
                alert("请输入正确订单号！");
            }
        }



    })
    .controller('new1Ctrl',function($scope,Position) {
        var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 10,
            center: [121.48,31.22]
        });
        AMap.plugin('AMap.ToolBar',function(){
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar)
        })


        Position.getAllMarker({},function(data){
            var infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(0,-30)});
            for(var i=0;i<data.data.length;i++ ){
                 var site_id = data.data[i].site_id;
                var lng = data.data[i].lng;
                var lat = data.data[i].lat;
                 var marker = new AMap.Marker({
                    position: [data.data[i].lng, data.data[i].lat],
                    map:map
                });
                marker.content='网点'+(site_id);
                marker.on('click',markerClick);
                marker.emit('click',{target:marker});
            }
            function markerClick(e){
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            map.setFitView();

        });



    });
