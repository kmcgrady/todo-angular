(function() {
  'use strict';

  const app = angular.module('todoApp');
  app.controller('PeopleController', function() {
    this.nameToAdd = '';
    this.people = [];

    this.addPerson = function() {
      this.people.push({ name: this.nameToAdd });
      this.nameToAdd = '';
    };
  });

  app.controller('TodoListController', function() {
    this.todoToAdd = '';
    this.todos = [];

    this.addTodo = function() {
      this.todos.push({
        completed: false,
        text: this.todoToAdd
      });
      this.todoToAdd = '';
    };

    this.completeTodo = function(todo) {
      todo.completed = true;
    };
  })
}());
