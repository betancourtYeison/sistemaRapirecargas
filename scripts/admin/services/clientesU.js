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
  .factory('clientesServiceU',function(){	
	return{				
		updateCustomer:function(scope, location){//Funcion para actualizar			
  			scope.refclientes.$save(scope.clientes).then(function() {
  			  // data has been saved to our database  			  
  			  location.path('/clientesCRD');
  			});	
		},
		cancel:function(location){//Funcion para cancelar actualizacion
			location.path('/clientesCRD');
		}
	};
});