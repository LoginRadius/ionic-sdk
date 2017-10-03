
var app=angular.module('starter', ['ionic'])




app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'register.html'
  })
   .state('sociallogin', {
    url: '/sociallogin',
    templateUrl: 'sociallogin.html'
  })

    .state('forgotpassword', {
    url: '/forgotpassword',
    templateUrl: 'forgotpassword.html'
  })

    .state('afterloginredirection', {
    url: '/afterloginredirection',
    templateUrl: 'afterloginredirection.html'
  })
    .state('accountlinking', {
    url: '/accountlinking',
    templateUrl: 'accountlinking.html'
  })
   .state('updateprofile', {
    url: '/updateprofile',
    templateUrl: 'updateprofile.html'
  })
  .state('changepassword', {
    url: '/changepassword',
    templateUrl: 'changepassword.html'
  })
   .state('updatephone', {
    url: '/updatephone',
    templateUrl: 'updatephone.html'
  })
  .state('addemail', {
    url: '/addemail',
    templateUrl: 'addemail.html'
  })
 .state('removeemail', {
    url: '/removeemail',
    templateUrl: 'removeemail.html'
  })
 .state('changeusername', {
    url: '/changeusername',
    templateUrl: 'changeusername.html'
  });

  $urlRouterProvider.otherwise('/');  
});






