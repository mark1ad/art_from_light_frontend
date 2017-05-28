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

    // For modal that displays full sized picture
    vm.modalVisable = false;
    vm.selectedPhoto = {};

    vm.curPage = vm.homePage;
    vm.selectedUserId = -1;
    vm.userID = 0;
    vm.userName = "";
    vm.showLogin = showLogin;
    vm.showRegister = showRegister;
    vm.signOut = signOut;
    vm.showHome = showHome;
    vm.showUserPage = showUserPage;
    vm.showCollectionsPage = showCollectionsPage;
    vm.showPhotographs =  showPhotographs;
    vm.showPhotoModal = showPhotoModal;
    vm.closePhotoModal = closePhotoModal;

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

    function showCollectionsPage() {
      vm.curPage = vm.collectionsPage;
    }

    function showPhotographs() {
      vm.curPage = vm.photosPage;
    }

    function showPhotoModal(id) {
      vm.selectedPhoto = {};

      $http({
        method: 'GET',
        url: URL + 'pictures/' + id
      }).then(function(response) {
        vm.selectedPhoto = response.data;
        vm.modalVisable = true;
      }, function(error) {
        console.log("photos.showPHoto: ", error);
      })

    }

    function closePhotoModal() {
      vm.modalVisable = false;
    }
  }
})();
