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

      vm.photos = [];
      vm.selectedPhoto = {};
      vm.showFullSize = false;
      vm.initPage = initPage;
      vm.showPhoto = showPhoto;

      //*****************************
      // Controller functions

      function initPage() {
        vm.photos = [];

        $http({
          method: 'GET',
          url: URL + 'pictures'
        }).then(function(response) {
          vm.photos = response.data;
        }, function( error) {
          console.log("photos.initPage: ", error);
        })
      }

      function showPhoto(id) {
        vm.selectedPhoto = {};

        $http({
          method: 'GET',
          url: URL + 'pictures/' + id
        }).then(function(response) {
          vm.selectedPhoto = response.data;
          vm.showFullSize = true;
        }, function(error) {
          console.log("photos.showPHoto: ", error);
        })
      }

  }
})();
