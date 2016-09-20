(function(){ 'use strict'; })();

var angular = require('angular');
var WelcomeController = require('./controllers/welcome-controller');

var app = angular.module('SandboxApp', []);
app.controller('WelcomeController', ['$scope', WelcomeController]);
