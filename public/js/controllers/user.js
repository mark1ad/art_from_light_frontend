(function() {

  angular
    .module('artFromLightApp')
    .controller('UserPageController', UserPageController);

  UserPageController.$inject = ['$http'];

  function UserPageController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art-from-light-api.herokuapp.com/';
    }

    const vm = this;

    //**************************************
    // Controller members
    vm.currentUser = {};
    vm.userInfoEdit = {};
    vm.showeditform = false;
    vm.pictures = [];

    vm.showPage = showPage;
    vm.startEditInfo = startEditInfo;
    vm.saveUserInfo = saveUserInfo;
    vm.cancelInfoEdit = cancelInfoEdit;
    vm.deletePicture = deletePicture;

    //**************************************
    // Controller functions
    function showPage(userID) {
      if (userID < 0) return;

      vm.currentUser = {};
      vm.userInfoEdit = {};
      vm.pictures = [];

      $http(
        {
          method: 'GET',
          url: URL + 'users/' + userID
        }).then( function(response) {
          vm.currentUser = response.data;
          getUserPictures(vm.currentUser.id);
        }, function(error) {
          console.log("user.showPage errors: ", error);
        }
      )
    }

    function startEditInfo() {
      vm.showeditform = true;
      Object.assign(vm.userInfoEdit, vm.currentUser);
    }

    function saveUserInfo() {

      if (vm.userInfoEdit.name === undefined || vm.userInfoEdit === "") return;

      $http(
        {
          method: 'PUT',
          url: URL + 'users/' + vm.currentUser.id,
          data: vm.userInfoEdit
        }).then( function(response) {
          vm.currentUser = response.data;
        }, function(error) {
          console.log('user.saveUserInfo: ', error);
        })

      vm.showeditform = false;
    }

    function cancelInfoEdit() {
      vm.showeditform = false;
      vm.userIndoEdit = {};
    }

    function deletePicture(id, index) {
      $http({
        method: 'DELETE',
        url: URL + 'pictures/' + id
      }).then( function(response) {
        // remove from controller array
        vm.pictures.splice(index, 1);
      }, function(error) {
        console.log("user.deletePicture ", error);
      })

    }

    //========================================
    // helper functions
    function getUserPictures(userID) {
      $http({
        method: 'GET',
        url: URL + 'pictures/users/' + userID
      }).then( function(response) {
        vm.pictures = response.data;
      }, function( error) {
        console.log("user.getUserPictures ", error);
      })
    }

  }
})();
