(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.controller('PeopleCtrl', function(people) {
    this.nameToAdd = '';
    this.people = [];

    people.getAll().then((people) => {
      this.people = people;
    });

    this.addPerson = () => {
      people.addPerson(this.nameToAdd).then((person) => {
        this.people.push(person);
        this.nameToAdd = '';
      });
    };
  });

  app.controller('TodoListCtrl', function($scope, personTodos) {
    this.person = $scope.person;
    this.todoToAdd = '';
    this.todos = [];

    personTodos.getAllByPerson(this.person.id).then((todos) => {
      this.todos = todos;
    });

    this.addTodo = () => {
      personTodos.addTodo(this.todoToAdd, this.person.id).then((todo) => {
        this.todos.push(todo);
        this.todoToAdd = '';
      });
    };

    this.toggleCompleteTodo = (todo) => {
      personTodos.setTodoStatus(todo.id, todo.completed);
    }
  })
}());
