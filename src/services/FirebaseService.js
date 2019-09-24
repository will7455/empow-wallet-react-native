import * as firebase from "firebase";
import "firebase/auth";

const FirebaseService = {
    config: {
        apiKey: "AIzaSyDCdLBQeG6BWnCia7yKBXVvfAvrY5JUWnk",
        authDomain: "empow-wallet.firebaseapp.com",
        databaseURL: "https://empow-wallet.firebaseio.com",
        projectId: "empow-wallet",
        storageBucket: "",
        messagingSenderId: "851533988463",
        appId: "1:851533988463:web:ee0d904d9da6ddd7"
    },
    isLoggedIn: false,
    user: null,
    init (loginCallback) {
        firebase.initializeApp(this.config);
        firebase.auth().onAuthStateChanged(function(user) {
            loginCallback(user)
        });
    },

    register (email, password, callback) {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                callback(null);
            })
            .catch((error) => {
                callback(error.message)
            });
        } catch(error) {
            callback(error.message)
        }
    },

    login(email,password, callback) {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                callback(null);
            })
            .catch((error) => {
                callback(error.message)
            });
        } catch(error) {
            callback(error.message)
        }
    },

    logout(callback = null) {
        firebase.auth().signOut().then(function() {
            if(callback) callback(null, true)
        }).catch(function(error) {
            if(callback) callback(error)
        });
    },

    forgot (email, callback) {
        try {
            firebase.auth().sendPasswordResetEmail(email)
            .then((res) => {
                callback(null);
            })
            .catch((error) => {
                callback(error.message)
            });
        } catch(error) {
            callback(error.message)
        }
    },

    changePassword (oldPassword, newPassword, callback) {
        if(!this.isLoggedIn) callback("You need login first")

        firebase.auth().signInWithEmailAndPassword(this.user.email, oldPassword).then(res => {
            firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                callback(null)
            }).catch(error => {
                callback(error.message)
            });
        }).catch(error => {
            callback(this.getErrorMessage(error.code))
        })
    },

    getIdToken () {
        return firebase.auth().currentUser.getIdToken(true)
    },

    getErrorMessage(errorCode) {
        switch(errorCode) {
            case 'auth/invalid-email':
                return "Please type correct email format (abc@example.com)"
            case 'auth/user-not-found':
                return "Email not found"
            case 'auth/wrong-password':
                return "Wrong password"
        }
    },
}

export default FirebaseService