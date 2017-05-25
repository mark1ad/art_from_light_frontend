(function() {

  angular
    .module('artFromLightApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$http'];

  function HomeController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art-from-light-api.herokuapp.com/';
    }

    const vm = this;



    // Controller properties
    vm.allUsers = [];
    vm.getAllUsers = getAllUsers;

    // ********************
    // Functions

    function getAllUsers() {
      $http(
        {
          method: 'GET',
          url: URL + 'users',
        }).then(function(response) {
          vm.allUsers = response.data;
        }, function(error) {
          console.log("home.getAllUsers error: ", error);
        })
    }


  }
})();
