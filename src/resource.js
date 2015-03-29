(function (module) {
    'use strict';

    module.factory('resourceAPI', resourceAPI);

    function resourceAPI($http) {
        return {
            getData: getData
        }

        function getData() {
            return $http.get("/resource/people.json")
        }
    }



})(angular.module('app.resource',[]));