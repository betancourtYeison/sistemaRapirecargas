'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.Ventas
 * @description
 * # Ventas
 * Service in the facturacionAdminApp.
 */

//Servicio de Ventas
angular.module('facturacionAdminApp')
  .factory('reportesVentasServiceCRD',function(){	
	return{		
		verProductos:function(location, noFactura){//Funcion para eliminar usuario
			location.path('/reporteVentasProducto/' + noFactura);
		},
		ordenarPor:function(scope, orden, sort){//Funcion para eliminar usuario
			scope.sort = sort;
      		scope.ordenSeleccionado = orden;
		}
	};
});