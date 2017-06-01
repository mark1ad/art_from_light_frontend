(function() {

  angular
    .module('artFromLightApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$http'];

  function MainController($http) {

    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://art-from-light-api.herokuapp.com/';
    }

    const vm = this;

    // Constants for display pages
    vm.homePage = 0;
    vm.loginPage = 1;
    vm.userPage = 2;
    vm.registerPage = 3;
    vm.collectionsPage = 4;
    vm.photosPage = 5;
    vm.collectionPage = 6;
    vm.selectPicturesPage = 7;

    // For modal that displays full sized picture
    vm.modalVisable = false;
    vm.modalEdit = false;
    vm.selectedPhoto = {};

    vm.curPage = vm.homePage;
    vm.selectedUserId = -1;
    vm.selectedCollection = {};
    vm.userID = 0;
    vm.userName = "";

    vm.showLogin = showLogin;
    vm.showRegister = showRegister;
    vm.signOut = signOut;
    vm.showHome = showHome;
    vm.showUserPage = showUserPage;
    vm.showCollectionPage = showCollectionPage;
    vm.showCollectionsPage = showCollectionsPage;
    vm.showPhotographs =  showPhotographs;
    vm.showPhotoModal = showPhotoModal;
    vm.showSelectPicturesPage = showSelectPicturesPage;
    vm.closePhotoModal = closePhotoModal;
    vm.savePhotoModal = savePhotoModal;

    function showLogin() {
      vm.curPage = vm.loginPage;
    }

    function showRegister() {
      vm.curPage = vm.registerPage;
    }

    function showHome() {
      vm.curPage = vm.homePage;
    }

    function signOut() {
      vm.userID = 0;
      vm.userName = "";
      vm.curPage = vm.homePage;
    }

    function showUserPage(id){
      vm.curPage = vm.userPage;
      vm.selectedUserId = id;
    }

    function showCollectionPage(collection) {
      vm.curPage = vm.collectionPage;
      vm.selectedUserId = collection.user_id;
      vm.selectedCollection = collection;
    }

    function showCollectionsPage() {
      vm.curPage = vm.collectionsPage;
    }

    function showPhotographs() {
      vm.curPage = vm.photosPage;
    }

    function showPhotoModal(id, editMode = false) {
      vm.selectedPhoto = {};
      vm.modalEdit = editMode;

      $http({
        method: 'GET',
        url: URL + 'pictures/' + id
      }).then(function(response) {
        Object.assign(vm.selectedPhoto, response.data);
        vm.modalVisable = true;
      }, function(error) {
        console.log("photos.showPHoto: ", error);
      })

    }

    function showSelectPicturesPage(collection) {
      vm.curPage = vm.selectPicturesPage;
      Object.assign(vm.selectedCollection, collection);
    }

    function closePhotoModal() {
      vm.modalVisable = false;
    }

    function savePhotoModal() {
      if (vm.selectedPhoto.title === undefined || vm.selectedPhoto.title === "") return;

      $http({
        method: 'PUT',
        url: URL + 'pictures/' + vm.selectedPhoto.id,
        data: vm.selectedPhoto
      }).then( function(response) {
        vm.selectedPhoto =  {};
        vm.closePhotoModal();
      }, function(error) {
        console.log("main.savePhotoModal: ", error);
      })
    }
  }
})();
