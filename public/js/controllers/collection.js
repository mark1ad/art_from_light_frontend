(function() {

  angular
    .module('artFromLightApp')
    .controller('CollectionController', CollectionController);

  CollectionController.$inject = ['$http'];

  function CollectionController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art-from-light-api.herokuapp.com/';
    }

    const vm = this;

    //***************************
    // Controller members
    vm.curCollection = {};
    vm.userName = "";
    vm.pictures = [];

    vm.initPage = initPage;

    //***********************************
    // Controller functions
    function initPage(coll) {
      vm.curCollection = coll;
      vm.pictures = [];
      vm.userName = "";

      $http({
        method: 'GET',
        url: URL + 'users/' + coll.user_id
      }).then( function(response) {
        vm.userName = response.data.name;
        // Get pictures in collection
        getPictures(coll.id);
      }, function(error) {
        console.log("collections.initPage: ", error);
      })
    }

    //******************************
    // helper functions
    function getPictures(collID) {
      $http({
        method: 'GET',
        url: URL + 'collections/' + collID + '/pictures'
      }).then( function(response) {
        vm.pictures = response.data
      }, function(error ) {
        console.log("collections.getPictures: ", error);
      })
    }

  }

})();
