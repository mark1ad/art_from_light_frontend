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

  }
})();
