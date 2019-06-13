class AuthObject {

    constructor(user) {
        // Member instantiation.
        this.firestore = firebase.firestore();
        this.auth = firebase.auth;
        this.user = user;
        this.userCollect = this.firestore.collection('Users');
        this.userDoc = this.userCollect.doc('user-' + user.email);
    }

    set user(user) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    static addUser(email) {
        let userCollect = firebase.firestore().collection('Users');
        let userDoc =  userCollect.doc('user-' + email);

        userDoc.set({
            user: {
                email: email
            }
        });
    }

    isUser(email) {
        let userCollect = this.firestore.collection('Users');
        let userDoc =  userCollect.doc('user-' + this.user.email);
        
        userDoc.get().then(function (doc) {
            if (doc && doc.exists) {
                console.log(email + ' exists as a user');
            } else {
                AuthObject.addUser(email);
            }
        });
    }
}