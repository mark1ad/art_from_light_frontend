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

    vm.initPage = initPage;

    //***********************************
    // Controller functions
    function initPage(coll) {
      vm.curCollection = coll;

      $http({
        method: 'GET',
        url: URL + 'users/' + coll.user_id
      }).then( function(response) {
        vm.userName = response.data.name;
      }, function(error) {
        console.log("collections.initPage: ", error);
      })
    }

  }

})();
