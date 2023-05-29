firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.

		var user = firebase.auth().currentUser;

		sessionStorage.setItem("User_name", email_id);
		localStorage.setItem("UID", user.uid); //Envia el ID para checkear sus permisos
		localStorage.setItem("name", name);
		localStorage.setItem("lastname", lastname);
		//console.log(JSON.stringify(user.uid));

		window.location.href = "/home";

		if (user != null) {
			var email_id = user.email;
			var name = user.nombre;
			var lastname = user.apellido;
		}
	} else {
		// No user is signed in.
		//document.getElementById("login_div").style.display = "block";
	}
});

var contrasenia = document.getElementById("password_field");
contrasenia.addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		validate(e);
	}
});

function validate() {
	login();
}

function login() {
	var userEmail = document.getElementById("email_field").value;
	userEmail = userEmail.toLowerCase();
	var userPass = document.getElementById("password_field").value;

	localStorage.setItem("email", userEmail);
	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(() => {
			// Existing and future Auth states are now persisted in the current
			// session only. Closing the window would clear any existing state even
			// if a user forgets to sign out.
			// ...
			// New sign-in will be persisted with session persistence.
			return firebase.auth().signInWithEmailAndPassword(userEmail, userPass);
		})
		.catch((error) => {
			// Handle Errors here.
			document.getElementById("loginValidator").innerHTML =
				"Nombre de Usuario o Contraseña inválidos.";
			document.getElementById("loginValidator").style.display = "block";

			setTimeout(() => {
				document.getElementById("loginValidator").style.display = "none";
			}, 3000);

			var errorCode = error.code;
			var errorMessage = error.message;
		});

	// firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;

	//   window.alert("Error : " + errorMessage);

	//   // ...
	// });
	localStorage.setItem("UserID", userEmail);
	localStorage.setItem("email", userEmail);
}

function logout() {
	firebase.auth().signOut();
}

function GoToRegister() {
	window.location.href = "Registro.html";
}

const resetPassword = (email) => {
	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(() => {
			// Password reset email sent!
			// ..
			if (email) {
				document.getElementById("infomssg").style.display = "block";
				document.getElementById("infomssg").style.backgroundColor = "#2289e3";
				document.getElementById("boxmssg").innerText = "Enviado Correctamente!";
				document.getElementById("instrucciones").innerText =
					"Siga las instrucciones que enviamos a su correo para restablecer su contraseña";

				setTimeout(() => {
					document.getElementById("boxmssg").style.display = "none";
					document.getElementById("instrucciones").style.display = "block";
				}, 2000);

				setTimeout(() => {
					document.getElementById("infomssg").style.display = "none";
					document.getElementById("reset_input").value = "";
					document.getElementById("instrucciones").style.display = "none";
				}, 8000);
				setTimeout(() => {
					document.getElementById("boxmssg").style.display = "block";
					closeModal();
				}, 10000);
			}
		})

		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;

			document.getElementById("infomssg").style.display = "block";
			document.getElementById("infomssg").style.backgroundColor = "#c72022";
			document.getElementById("boxmssg").innerText = "Email inexistente";

			setTimeout(() => {
				document.getElementById("infomssg").style.display = "none";
			}, 3000);

			setTimeout(() => {
				document.getElementById("reset_input").value = "";
			}, 3000);
		});
};
