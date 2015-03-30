(function (module) {
    'use strict';

 module.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.otherwise('/')
     $stateProvider
         .state('create',{
             url:'/',
             templateUrl:'view/people-edit.html',
             controller:'app.controller',
             controllerAs:'vm',
             resolve: {
                 // you may resolve
             }
         })
         .state('list',{
             url:'/list',
             controller:'app.controller',
             controllerAs:'vm',
             templateUrl:'view/people-list.html'
         })

 }).controller('app.controller', appController);
    function appController(resourceAPI, $scope) {
        /*resourceAPI.getData().then(res){
            console.log(res);
        }*/

        var vm = this;
        var storedPeople = resourceAPI.getStoredData();
        vm.init = init;

        vm.init();

        console.log(resourceAPI.getStoredData());

        function init() {
            if(storedPeople.length > 0) {
                $scope.people = storedPeople;
            } else {
                resourceAPI.getData().then(function (res) {
                    $scope.people = res.data;
                    resourceAPI.storeData(res.data);
                    console.log(resourceAPI.getStoredData());
                }, function (reason) {
                    console.log('Error getting data from resource! ', reason);
                });
            }
        }

        $scope.personData = {};
        $scope.nameExists = false;

        $scope.addPerson = function() {
            if(checkIfNameExists($scope.personData.name)) {
                $scope.people.push($scope.personData);
                resourceAPI.storeData($scope.people);
                $scope.clearForm();
                $scope.nameExists = false;
                console.log(resourceAPI.getStoredData());
            } else {
                $scope.nameExists = true;
            }
        }

        $scope.clearForm = function() {
            $scope.personData = {};
            $scope.personForm.$setPristine();
        }

        function checkIfNameExists(name) {
            var isValid = true;
            if($scope.people.length > 0) {
                for(var idx in $scope.people) {
                    if(name == $scope.people[idx].name) {
                        isValid = false;
                    }
                }
            }

            return isValid;
        }

    }


})(angular.module('app',['ui.router','app.resource']));