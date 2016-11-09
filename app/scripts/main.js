(function(){ 'use strict'; })();

var angular = require('angular');
var TodoCtrl = require('./controllers/todo-controller');
var TodoService = require('./services/todo-service');

var app = angular.module('todoListApp', []);
app.controller('TodoCtrl', ['$scope', 'TodoService', TodoCtrl]);
app.service('TodoService', [TodoService]);
