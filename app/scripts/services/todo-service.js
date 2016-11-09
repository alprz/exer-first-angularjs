(function(){ 'use strict' })()

var angular = require('angular')
var TodoService = function() {
  this.todoList = function() {
    return [
      { summary: 'Learn AngularJS' },
      { summary: 'Add Minification' }
    ]
  }
}

module.exports = TodoService
