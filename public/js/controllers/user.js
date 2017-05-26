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

    vm.showPage = showPage;
    vm.startEditInfo = startEditInfo;
    vm.saveUserInfo = saveUserInfo;
    vm.cancelInfoEdit = cancelInfoEdit;

    //**************************************
    // Controller functions
    function showPage(userID) {
      if (userID < 0) return;

      $http(
        {
          method: 'GET',
          url: URL + 'users/' + userID
        }).then( function(response) {
          vm.currentUser = response.data;
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

      console.log(vm.userInfoEdit);
      console.log(vm.currentUser);
      $http(
        {
          method: 'PUT',
          url: URL + 'users/' + vm.currentUser.id,
          data: vm.userInfoEdit
        })
        .then( function(response) {
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

  }
})();
