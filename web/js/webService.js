angular.module('PCFactory',[])
    .factory('Position',function($http,CONFIG){


        var getAllMarker = function (query,success) {
            $http.post(CONFIG.host + '/getAllMarker',query)
                .success(function(data){
                    success(data);
                });
        };

        return {
            getAllMarker : getAllMarker
        };
    });