'use strict';

/**
 * @ngdoc service
 * @name facturacionLoginApp.login
 * @description
 * # login
 * Service in the facturacionLoginApp.
 */

//Servicio de Login
angular.module('facturacionLoginApp')
  .factory('loginService',function(){	

  	var user = false;//variable para determinar si hay un usuario
  	var emailUser = null;//variable para guardar el email de usuario
	return{		
		loginPass:function(firebaseRef,email,pass){//Funcion para realizar login normal
			firebaseRef.authWithPassword({
			  email    : email,
			  password : pass
			}, function(error, authData) {
			  if (error) {
			    switch (error.code) {
			      case "INVALID_EMAIL":
			        document.getElementById('errorLogin').innerHTML = "El E-mail no es correcto.";
			        break;
			      case "INVALID_PASSWORD":
			        document.getElementById('errorLogin').innerHTML = "La contraseña no es correcta.";
			        break;
			      case "INVALID_USER":
			        document.getElementById('errorLogin').innerHTML = "Este usuario no existe.";
			        break;
			      default:
			      	document.getElementById('errorLogin').innerHTML = error;
			    }
			  } else {
			  	document.getElementById('errorLogin').innerHTML = "";
			    document.location.href = 'http://localhost:8080/sistemaRapirecargas/admin.html';//redirecciona a admin
			  }
			});
		},		
		newUser:function(firebaseRef,email,pass){//Funcion para crear un usuario nuevo
			firebaseRef.createUser({
				email: email,
				password: pass
			},
			function(error, userData) {
			  if (error) {	
			  	document.getElementById('sucessLogin').innerHTML = "";		  	
 			    switch (error.code) {
			      case "EMAIL_TAKEN":			        
			        document.getElementById('errorRegister').innerHTML = "El E-mail ya esta en uso.";
			        break;
			      case "INVALID_EMAIL":
			        console.log("The specified email is not a valid email.");
			        document.getElementById('errorRegister').innerHTML = "No es un E-mail valido.";
			        break;
			      default:
			        document.getElementById('errorRegister').innerHTML = error;
			    }
			  } else {
			  	document.getElementById('errorRegister').innerHTML = "";
			    document.getElementById('sucessLogin').innerHTML = "El usuario se ha creado satisfactoriamente.";
			  }
			});
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