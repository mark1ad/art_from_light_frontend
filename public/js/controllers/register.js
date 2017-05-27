(function() {
  angular
    .module('artFromLightApp')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http'];

    function RegisterController($http) {

      var URL;
      if (window.location.href === 'http://localhost:3001/') {
        URL = 'http://localhost:3000/';
      } else {
        URL = 'https://art-from-light-api.herokuapp.com/';
      }

      const vm = this;

      vm.user = {};
      vm.register = register;

      function register(main) {

        // User name and password are required
        if (vm.user.username === undefined ||
            vm.user.username === "" ||
            vm.user.password === undefined ||
            vm.user.password === "") {
          return;
        }

        $http({
          method: 'POST',
          url: URL + 'users',
          data: {
            user: {
              name: vm.user.name,
              username: vm.user.username,
              address: vm.user.address,
              password: vm.user.password
            }
          }
        }).then( function( response) {
          main.selectedUserId = response.data.id;
          main.userID = response.data.id;
          main.userName = response.data.name;
          main.curPage = main.userPage;
        }, function( error) {
          console.log("register.register ", error);
        })
      }

    }
})();
