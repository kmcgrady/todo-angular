(function() {
  'use strict';

  const app = angular.module('todoApp');
  app.controller('PeopleCtrl', function($http) {
    $http.defaults.headers.common['Content-Type'] = 'application/json'
    this.nameToAdd = '';
    this.people = [];

    $http.get('https://galvanize-todos.herokuapp.com/km-persons')
      .then((response) => {
        this.people = response.data;
      })
      .catch((err) => {
        console.error(err);
      });

    this.addPerson = () => {
      $http.post('https://galvanize-todos.herokuapp.com/km-persons', {
        name: this.nameToAdd
      })
      .then((response) => {
        this.people.push(response.data);
        this.nameToAdd = '';
      })
      .catch((err) => {
        console.error(err);
      });
    };
  });

  app.controller('TodoListCtrl', function($scope, $http) {
    this.person = $scope.person;
    this.todoToAdd = '';
    this.todos = [];

    $http.get(`https://galvanize-todos.herokuapp.com/km-persons/${this.person.id}/km-todos`)
      .then((response) => {
        this.todos = response.data;
      })
      .catch((err) => {
        console.error(err);
      });

    this.addTodo = () => {
      $http.post('https://galvanize-todos.herokuapp.com/km-todos', {
        text: this.todoToAdd,
        completed: false,
        'km-personId': this.person.id
      })
      .then((response) => {
        this.todos.push(response.data);
        this.todoToAdd = '';
      })
      .catch((err) => {
        console.error(err);
      });
    };

    this.toggleCompleteTodo = (todo) => {
      $http.patch(`https://galvanize-todos.herokuapp.com/km-todos/${todo.id}`, {
        completed: todo.completed
      })
      .catch((err) => {
        console.error(err);
      });
    }
  })
}());
