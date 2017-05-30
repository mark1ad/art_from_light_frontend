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
    vm.collections = [];
    vm.addPicFormVisible = false;
    vm.newPicture = {};
    vm.showEditModal = false;
    vm.newCollection = {};

    vm.showPage = showPage;
    vm.startEditInfo = startEditInfo;
    vm.saveUserInfo = saveUserInfo;
    vm.cancelInfoEdit = cancelInfoEdit;
    vm.deletePicture = deletePicture;
    vm.showAddPicForm = showAddPicForm;
    vm.addPicture = addPicture;
    vm.showAddCollForm = showAddCollForm;
    vm.saveNewCollection = saveNewCollection;

    //**************************************
    // Controller functions
    function showPage(userID) {
      if (userID < 0) return;

      vm.currentUser = {};
      vm.userInfoEdit = {};
      vm.pictures = [];
      vm.collections = [];

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

    function showAddPicForm(value) {
      vm.addPicFormVisible = value;
    }

    function showAddCollForm(value) {
      vm.newCollection = {};
      vm.showEditModal = value;
    }

    function saveNewCollection() {
      if (vm.newCollection.title === undefined || vm.newCollection.title === "") return;

      vm.newCollection.user_id = vm.currentUser.id;

      $http({
        method: 'POST',
        url: URL + '/collections',
        data: vm.newCollection
      }).then( function (response) {
        vm.collections.unshift( response.data);
        vm.newCollection = {};
        vm.showAddCollForm(false);
      }, function(error) {
        console.log("user.saveNewCollection: ", error);
      })
    }

    // Add a new picture to the db
    function addPicture(userID) {

      if (vm.newPicture.url === undefined || vm.newPicture.url === "") return;

      vm.newPicture.user_id = userID;

      $http({
        method: 'POST',
        url: URL + '/pictures',
        data: vm.newPicture
      }).then( function(response) {
        vm.pictures.unshift( response.data);
        vm.newPicture = {};
        vm.showAddPicForm(false);
      }, function(error) {
        console.log("user.addPicture: ", error);
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
        getUserCollections(userID);
      }, function( error) {
        console.log("user.getUserPictures ", error);
      })
    }

    function getUserCollections(userID) {
      $http({
        method: 'GET',
        url: URL + 'collections/users/' + userID
      }).then( function(response) {
        vm.collections = response.data;
      }, function(error) {
        console.log("user.getUserCollections ", error);
      })
    }

  }
})();
