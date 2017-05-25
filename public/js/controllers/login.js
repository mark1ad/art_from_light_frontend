(function() {
  angular
    .module('artFromLightApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http'];

  function LoginController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art-from-light-api.herokuapp.com/';
    }

    const vm = this;

    vm.user = {};
    vm.badLogin = false;
    vm.login = login;

    function login(main) {
      if (vm.user.name === undefined || vm.user.name === "") return;

      $http({
        method: 'POST',
        url: URL + 'users/login',
        data: {
          user: {
            name: vm.user.name,
            password: vm.user.password
          }
        }
      }).then(function(response) {
        // console.log(response.data);
        if (response.data.status == 200) {
          main.userID = response.data.user.id;
          main.userName = response.data.user.name;
          vm.badLogin = false;
          main.curPage = main.userPage;
        }
        else {
          vm.badLogin = true;
        }
      },function(response) {
        console.log("fail");
        vm.badLogin = true;
      })
    }

  }
})();
