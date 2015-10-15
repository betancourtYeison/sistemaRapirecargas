'use strict';

/**
 * @ngdoc overview
 * @name facturacionAdminApp
 * @description
 * # facturacionAdminApp
 *
 * Main module of the application.
 */
 
angular
  .module('facturacionAdminApp', [
    'facturacionAdminApp.config',
    'ngAnimate',    
    'ngRoute',
    'facturacionAdminApp.services',
    'ngTable',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider//Determina las rutas con sus controladores
      .when('/', {//si en la url es /
        templateUrl: 'views/inicio.html'
      })      
      .when('/registroVentasCRD', {//si en la url es /
        templateUrl: 'views/ventas/registroVentasCRD.html',
        controller: 'RegistroVentasCtrlCRD'
      })       
      .when('/clientesCRD', {//si en la url es /
        templateUrl: 'views/ventas/clientesCRD.html',
        controller: 'ClientesCtrlCRD'
      }) 
      .when('/clientesU/:rut', {//si en la url es /
        templateUrl: 'views/ventas/clientesU.html',
        controller: 'ClientesCtrlU'
      })   
      .when('/registroPedidos', {//si en la url es /
        templateUrl: 'views/compras/registroPedidos.html',
        controller: 'RegistroVentasCtrlCRD'
      })       
      .when('/stockActual', {//si en la url es /
        templateUrl: 'views/inventario/stockActual.html',
        controller: 'ListadoProductosCtrlCRD'
      })        
      .when('/listaProductosCRD', {//si en la url es /
        templateUrl: 'views/productos/listaProductosCRD.html',
        controller: 'ListadoProductosCtrlCRD'
      })  
      .when('/listaProductosU/:codigoBarras', {//si en la url es /
        templateUrl: 'views/productos/listaProductosU.html',
        controller: 'ListadoProductosCtrlU'
      })        
      .when('/recargasCRD', {//si en la url es /
        templateUrl: 'views/recargas/recargasCRD.html',
        controller: 'RecargasCtrlCRD'
      })  
      .when('/recargasU/:cliente', {//si en la url es /
        templateUrl: 'views/recargas/recargasU.html',
        controller: 'RecargasCtrlU'
      })               
      .when('/llamadasInterCRD', {//si en la url es /
        templateUrl: 'views/llamadasInter/llamadasInterCRD.html',
        controller: 'LlamadasInterCtrlCRD'
      })  
      .when('/llamadasInterU/:celular', {//si en la url es /
        templateUrl: 'views/llamadasInter/llamadasInterU.html',
        controller: 'LlamadasInterCtrlU'
      })    
      .when('/tarjetasSIMCRD', {//si en la url es /
        templateUrl: 'views/tarjetasSIM/tarjetasSIMCRD.html',
        controller: 'TarjetasSIMCtrlCRD'
      })  
      .when('/tarjetasSIMU/:celular', {//si en la url es /
        templateUrl: 'views/tarjetasSIM/tarjetasSIMU.html',
        controller: 'TarjetasSIMCtrlU'
      })                  
      .when('/reporteVentas', {//si en la url es /
        templateUrl: 'views/reportes/reporteVentas.html',
        controller: 'ReportesVentasCtrl'
      })           
      .when('/reporteVentasProducto/:noFactura', {//si en la url es /
        templateUrl: 'views/reportes/reporteVentasProducto.html',
        controller: 'ReportesVentasProductoCtrl'
      })                          
      .when('/404', {//si en la url es /
        templateUrl: 'views/404.html'
      })      
      .otherwise({//si en la url es cualquier otra
        redirectTo: '/404'
      });
  })
  .run(['$rootScope', 'FBURL', 'loginService', function($rootScope, FBURL, loginService) {
    if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
      // double-check that the app has been configured
      angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      setTimeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
    else {
      $rootScope.FBURL = FBURL;
    }

    $rootScope.$on('$routeChangeStart', function(){//Inicia el rootScope

    if(!loginService.isLogged()){//Verifica si esta logeado
      document.location.href = 'http://localhost:8080/sistemaRapirecargas/';//redirecciona a login
    }    
  });
  }]);

