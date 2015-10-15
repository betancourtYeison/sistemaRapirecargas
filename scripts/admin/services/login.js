'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.login
 * @description
 * # login
 * Service in the facturacionAdminApp.
 */

//Servicio de Login
angular.module('facturacionAdminApp')
  .factory('loginService',function(){	
  	var user = false;//variable para determinar si hay un usuario
  	var emailUser = null;//variable para guardar el email de usuario
	return{				
		logout:function(firebaseRef,scope){//Funcion para cerrar sesion						
			firebaseRef.unauth();
			scope.user='';//borra el usuario
			document.location.href = 'http://localhost:8080/sistemaRapirecargas/';//redirecciona a login
		},		
		setUser:function(userLog,email){//Funcion para guarda un usuario autenticado
			user = userLog;//guarda el usuario en la variable user
			emailUser = email;//guarda el email de usuario en la variable emailUser
		},
		getUser:function(){//Funcion para retornar el usuario
			return emailUser;
		},
		isLogged:function(){//Funcion para retornar si esta autenticado un usuario
			return user;
		}
	};
});