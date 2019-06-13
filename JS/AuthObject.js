class AuthObject {

    constructor(user) {
        // Member instantiation.
        this.firestore = firebase.firestore();
        this.auth = firebase.auth;
        this.user = user;
        this.userCollect = this.firestore.collection('Users');
        this.userDoc = this.userCollect.doc('user-' + user.email);
    }

    get user() {
        return this.user;
    }

    static addUser(email) {
        userDoc.set({
            user: {
                email: email
            }
        });
    }

    static isUser(email) {
        this.userDoc.get().then(function (doc) {
            if (doc && doc.exists) {
                console.log(this.userEmail + ' exists as a user');
            } else {
                addUser(email);
            }
        });
    }
}