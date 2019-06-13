class App {
    constructor() {
        this.firestore = firebase.firestore();
        this.auth = firebase.auth();
    }

    authInstance() {
        return this.auth;
    }


}

let instance = new App();
let authObject;

instance.authInstance().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        authObject = new AuthObject(firebaseUser);
        authObject.isUser(firebaseUser.email);
    } else {
        console.log('Not logged in');
    }
});
