(function() {

  angular
    .module( 'artFromLightApp')
    .controller('SelectPicsController', SelectPicsController);

    SelectPicsController.$injecct = ['$http'];

    function SelectPicsController($http) {

      var URL;
      if (window.location.href === 'http://localhost:3001/') {
        URL = 'http://localhost:3000/';
      } else {
        URL = 'https://art-from-light-api.herokuapp.com/';
      }

      const vm = this;

      //**************************
      // Controller members
      vm.collection = {};

      vm.initPage = initPage;

      //***************************
      // Controller functions

      function initPage(coll) {
        vm.collection = coll;
      }
    }
})();
