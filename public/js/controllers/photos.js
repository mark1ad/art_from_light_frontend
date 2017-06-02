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
      vm.selectedTags = [];
      vm.selectedPhoto = {};
      vm.showFullSize = false;
      vm.initPage = initPage;
      vm.tagSelected = tagSelected;

      //*****************************
      // Controller functions

      function initPage() {
        vm.photos = [];
        vm.tags = [];
        vm.selectedTags = [];

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

      function tagSelected(id) {
        console.log("tagSelected ", id);

        index = vm.selectedTags.indexOf(id);
        if (index === -1) {
          vm.selectedTags.push(id);
        }
        else {
          vm.selectedTags.splice(index, 1);
        }

        vm.photos = [];

        $http({
          method: 'GET',
          url: URL + 'tags/' + id + '/pictures'
        }).then(function(response){
          console.log("response.data ", response.data);
          vm.photos = response.data;
        }, function(error) {
          console.log("photos.tagSelected: ", error);
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
