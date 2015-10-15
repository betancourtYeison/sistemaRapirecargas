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
  .factory('recargasServiceU',function(){	
	return{				
		updateProduct:function(scope, location){//Funcion para actualizar			
  			scope.refproductsList.$save(scope.productsList).then(function() {
  			  // data has been saved to our database  			  
  			  location.path('/recargasCRD');
  			});	
		},
		cancel:function(location){//Funcion para cancelar actualizacion
			location.path('/recargasCRD');
		}
	};
});