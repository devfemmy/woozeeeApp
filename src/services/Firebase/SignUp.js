import Firebase from './firebaseConfig';

export const SignUpUser = async (email, password) => {
    console.log("email", email)
    try {
        return await Firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
}