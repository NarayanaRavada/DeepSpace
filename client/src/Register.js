import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";


const Register = ({ email, password }) => {
    const RegisterHandler= () =>{
            const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
    }
    const SignoutHandler= () =>{
        const auth = getAuth();
        signOut(auth)
        .then(() => {
        // Sign-out successful.
        })
        .catch((error) => {
        // An error happened.
        });
    }
};
