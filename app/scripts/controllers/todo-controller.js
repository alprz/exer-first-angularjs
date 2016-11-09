(function(){ 'use strict' })()

var angular = require('angular')

var TodoCtrl = function($scope, TodoService){
  $scope.todoList = TodoService.todoList()
}

module.exports = TodoCtrl
