angular.module('PCMapInput',['PCFactory'])
    .constant("CONFIG",{
        host: "http://192.168.1.103:9909",//本机测试地址(可变)
        version:'1.0.0'//版本
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
