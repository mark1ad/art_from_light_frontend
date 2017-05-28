(function() {

  angular
    .module('artFromLightApp')
    .controller('PhotosController', PhotosController);

    PhotosController.$inject = ['$http'];

    function PhotosController($http) {

      var URL;
      if (window.location.href === 'http://localhost:3001/') {
        URL = 'http://localhost:3000/';
      } else {
        URL = 'https://art-from-light-api.herokuapp.com/';
      }

      const vm = this;

      //******************************
      // Controller members
      
  }
})();
