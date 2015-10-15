'use strict';

/**
 * @ngdoc overview
 * @name facturacionLoginApp
 * @description
 * # facturacionLoginApp
 *
 * Main module of the application.
 */

angular
  .module('facturacionLoginApp', [
    'facturacionAdminApp.config',
    'ngAnimate',    
    'ngRoute',
    'facturacionAdminApp.services',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider//Determina las rutas con sus controladores
      .when('/', {//si en la url es /
        templateUrl: 'views/login.html'
      })
      .when('/registro', {//si en la url es /
        templateUrl: 'views/registro.html'
      })  
      .when('/404', {//si en la url es /
        templateUrl: 'views/404.html'
      })      
      .otherwise({//si en la url es cualquier otra
        redirectTo: '/404'
      });
  })
  .run(function($rootScope, loginService){//Arranca con la aplicacion
    $rootScope.$on('$routeChangeStart', function(){//Inicia el rootScope
    
    if(loginService.isLogged()){//Verifica si esta logeado
      document.location.href = 'http://localhost:8080/sistemaRapirecargas/admin.html';//redirecciona a login
    }    
  });
});
