angular.module('PCFactory',[])
    .factory('Position',function($http,CONFIG){


        var getAllMarker = function (query,success) {
            $http.post(CONFIG.host + '/getAllMarker',query)
                .success(function(data){
                    success(data);
                });
        };
        var getAllMarker4 = function (query,success) {
            $http.post(CONFIG.host + '/getAllMarker4',query)
                .success(function(data){
                    success(data);
                });
        };

        return {
            getAllMarker : getAllMarker,
            getAllMarker4:getAllMarker4
        };
    });