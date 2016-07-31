(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.factory('people', function($http) {
    $http.defaults.headers.common['Content-Type'] = 'application/json';

    return {
      getAll: () => {
        return $http.get('https://galvanize-todos.herokuapp.com/km-persons')
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            console.error(err);
          });
      },
      addPerson: (name) => {
        return $http.post('https://galvanize-todos.herokuapp.com/km-persons', { name })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        });
      }
    };
  });

  app.factory('personTodos', function($http) {
    $http.defaults.headers.common['Content-Type'] = 'application/json';

    return {
      getAllByPerson: (personId) => {
        return $http.get(`https://galvanize-todos.herokuapp.com/km-persons/${personId}/km-todos`)
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            console.error(err);
          });
      },
      addTodo: (text, personId) => {
        return $http.post('https://galvanize-todos.herokuapp.com/km-todos', {
          text,
          completed: false,
          'km-personId': personId
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        });
      },
      setTodoStatus: (todoId, status) => {
        return $http.patch(`https://galvanize-todos.herokuapp.com/km-todos/${todoId}`, {
          completed: status
        })
        .catch((err) => {
          console.error(err);
        });
      }
    };
  });
})();
