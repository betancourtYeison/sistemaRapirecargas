'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ReportesVentasCtrl
 * @description
 * # ReportesVentasCtrl
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio reportesVentasServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ReportesVentasCtrl', ['$scope', 'ngTableParams', 'reportesVentasServiceCRD', '$timeout', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, reportesVentasServiceCRD, $timeout, $location, $firebaseArray, firebaseRef, $filter) {      
  
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/registroVentas");    

    $scope.refVentas = $firebaseArray(ref);

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refVentas.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refVentas, params.orderBy()) : data;                                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    }); 

    $scope.verProductos = function(noFactura){
      reportesVentasServiceCRD.verProductos($location, noFactura); 
    };    

    $scope.ordenarPor = function(orden,sort){
      reportesVentasServiceCRD.ordenarPor($scope, orden, sort);            
    };

}]);