(function() {

  angular
    .module('artFromLightApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$http'];

  function MainController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art_from_light_app.com/';
    }

    const vm = this;

    // Constants for display pages
    vm.homePage = 0;
    vm.loginPage = 1;
    vm.userPage = 2;

    vm.curPage = vm.homePage;
    vm.userID = 0;
    vm.userName = "";
    vm.showLogin = showLogin;
    vm.signOut = signOut;
    vm.showHome = showHome;

    function showLogin() {
      vm.curPage = vm.loginPage;
    }

    function showHome() {
      vm.curPage = vm.homePage;
    }

    function signOut() {
      vm.userID = 0;
      vm.userName = "";
      vm.curPage = vm.homePage;
    }
  }
})();
