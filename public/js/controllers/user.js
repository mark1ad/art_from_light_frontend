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
    vm.newPicture = {};
    vm.showEditModal = false; // shows modal for adding a collection
    vm.showAddPicModal = false;
    vm.showUserModal = false;
    vm.newCollection = {};

    vm.showPage = showPage;
    vm.showEditUserModal = showEditUserModal;
    vm.saveUserInfo = saveUserInfo;
    vm.deletePicture = deletePicture;
    vm.showAddPicForm = showAddPicForm;
    vm.showAddCollForm = showAddCollForm;
    vm.saveNewCollection = saveNewCollection;
    vm.deleteCollection = deleteCollection;
    vm.saveNewPicture = saveNewPicture;

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

    function showEditUserModal(value) {
      vm.userInfoEdit.name = vm.currentUser.name;
      vm.userInfoEdit.address = vm.currentUser.address;
      vm.userInfoEdit.profile_url = vm.currentUser.profile_url;
      vm.userInfoEdit.password = vm.currentUser.password_digest;

      vm.showUserModal = value;
    }

    function saveUserInfo() {

      if (vm.userInfoEdit.name === undefined || vm.userInfoEdit.name === "") return;

      $http(
        {
          method: 'PUT',
          url: URL + 'users/' + vm.currentUser.id,
          data: {
            name: vm.userInfoEdit.name,
            address: vm.userInfoEdit.address,
            password: vm.userInfoEdit.password,
            profile_url: vm.userInfoEdit.profile_url
          }
        }).then( function(response) {
          Object.assign(vm.currentUser, response.data);
        }, function(error) {
          console.log('user.saveUserInfo: ', error);
        })

        vm.showEditUserModal(false);
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
      vm.showAddPicModal = value;
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

    function deleteCollection(coll) {
      $http({
        method: 'DELETE',
        url: URL + 'collections/' + coll.id
      }).then(function(resonse) {
        vm.showPage(vm.currentUser.id);
      }, function(error) {
        console.log("user.deleteCollection: ", error);
      })
    }

    // Add a new picture to the db
    function saveNewPicture() {

      console.log("saveNewPicture");
      if (vm.newPicture.url === undefined || vm.newPicture.url === "") {
        console.log("saveNewPicture url not set");
         return;
       }

      vm.newPicture.user_id = vm.currentUser.id;

      $http({
        method: 'POST',
        url: URL + '/pictures',
        data: vm.newPicture
      }).then( function(response) {
        vm.pictures.unshift( response.data);
        vm.newPicture = {};
        vm.showAddPicForm(false);
      }, function(error) {
        console.log("user.saveNewPicture: ", error);
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
