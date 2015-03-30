(function (module) {
    'use strict';

    module.factory('resourceAPI', resourceAPI);

    function resourceAPI($http) {
        var people = [];

        return {
            getData: getData,
            storeData: storeData,
            getStoredData: getStoredData
        }

        function storeData(storePeople) {
            people = storePeople;
        }

        function getData() {
            return $http.get("/resource/people.json");
        }

        function getStoredData() {
            return people;
        }
    }



})(angular.module('app.resource',[]));