(function (module) {
    'use strict';

 module.config(function ($stateProvider) {

     $stateProvider
         .state('create',{
             url:'/',
             templateUrl:'view/people-edit.html',
             controller:'app.controller',
             controllerAs:'vm'
         })
         .state('list',{
             url:'/list',
             templateUrl:'view/people-list.html'
         })

 }).controller('app.controller', appController);
    function appController(resourceAPI) {
        /*resourceAPI.getData().then(res){
            console.log(res);
        }*/

        var vm = this;
        vm.init = init;

        vm.init()

        function init() {
            resourceAPI.getData().then(function (res) {
                console.log(res);
            }, function (reason) {
                console.log('Error getting data from resource! ', reason);
            })

        }
    }


})(angular.module('app',['ui.router','app.resource']));