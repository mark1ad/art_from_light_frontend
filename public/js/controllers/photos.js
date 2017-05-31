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
      vm.tags = [];
      vm.selectedPhoto = {};
      vm.showFullSize = false;
      vm.initPage = initPage;

      //*****************************
      // Controller functions

      function initPage() {
        vm.photos = [];

        $http({
          method: 'GET',
          url: URL + 'pictures'
        }).then(function(response) {
          vm.photos = response.data;
          getTags();
        }, function( error) {
          console.log("photos.initPage: ", error);
        })
      }

      //*************************
      // helper functions
      function getTags() {
        $http({
          method: 'GET',
          url: URL + 'tags'
        }).then(function(response) {
          vm.tags = response.data;
        }, function(error) {
          console.log("photos.getTags: ", error);
        })
      }

  }
})();
