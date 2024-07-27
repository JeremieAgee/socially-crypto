import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { addADoc } from "./firebaseUtils";
import { auth, db } from "../../firebase.config";

async function registerUser(email, password, user) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;

		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("error creating user: ", errorCode, errorMessage);
		});
		addADoc(db, "users", user)
}

async function login(email, password) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			auth.currentUser = user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("error logging in user: ", errorCode, errorMessage);
		});
}

async function logout() {
	signOut(auth)
		.then(() => {
			// Sign-out successful
			console.log("user Logged Out");
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("error logging in user: ", errorCode, errorMessage);
		});
}

export { registerUser, login, logout };
