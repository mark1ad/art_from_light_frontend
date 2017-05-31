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
      vm.pictures = [];
      vm.selectedPictures = [];
      vm.showOutline = true;

      vm.initPage = initPage;
      vm.selectPicture = selectPicture;
      vm.addNewPictures = addNewPictures;
      vm.pictureIsSelected = pictureIsSelected;

      //***************************
      // Controller functions

      function initPage(coll) {
        Object.assign(vm.collection, coll);

        // get all pictures
        $http({
          method: 'GET',
          url: URL + 'pictures'
        }).then( function(response) {
          vm.pictures = response.data;
        }, function(error) {
          console.log("selectPicture.initPage: ", error);
        })
      }

      function pictureIsSelected(id) {
        if (vm.selectedPictures.indexOf(id) !== -1) {
          return true;
        }
        return false;
      }

      function selectPicture(id) {
        console.log("selectPicture ", id);
        index = vm.selectedPictures.indexOf(id);
        if (index === -1) {
          vm.selectedPictures.push(id);
        }
        else {
          vm.selectedPictures.splice(index, 1);
        }
      }

      function addNewPictures() {
        console.log("addNewPictures ", vm.selectedPictures);

        $http({
          method: 'POST',
          url: URL + 'collections/' + vm.collection.id + '/picture_add',
          data: {
            picture_id: vm.selectedPictures[0]
          }
        }).then( function(response) {
          console.log(">>>>>>>>>>success");
        }, function(error) {
          console.log("selectPicture.addNewPicture: ", error);
        })
      }

      //***************************
      // helper functions

    }
})();
