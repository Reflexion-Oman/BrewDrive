/* #region Firestore Elements */
const firestore = firebase.firestore();
const settings = {/* your settings... */};
firestore.settings(settings);
const auth = firebase.auth();
let user;
let userData;
let userEmail;
let brewCount;

/* #endregion Firestore Elements */

const logoutBtn = document.getElementById('log-out-button');
const homeBtn = document.getElementById('nav.home');
const myBrewsBtn = document.getElementById('nav.my-brews');
const exploreBtn = document.getElementById('nav.explore');

// Authorization State Handler
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

        // store for db use
        user = firebaseUser;
        userEmail = firebaseUser.email;
        isUser(userEmail);

        // Log Out Event Protocol
        logoutBtn.addEventListener('click', e =>{
            auth.signOut();
            window.location = 'login.html';
        });
    } else {
        window.location = 'login.html';
    }
});

// References for db
let userCollect = firestore.collection('Users');
let userDoc;

function addUser() {
    userDoc.set({
        user: {
            email: userEmail,
            uid: user.uid
        },
        myBrewCount: 0
    });
}

function isUser(email) {
    userDoc = userCollect.doc('user-' + userEmail);
    userDoc.get().then(function(doc)  {
        // User exists
        if (doc && doc.exists) {
            userData = doc.data();
            brewCount = userData.myBrewCount;
        } 
        else {
            addUser();
        }
    });
}

/* #region Nav Functionality */

homeBtn.addEventListener('click', e => {
    window.location = 'index.html';
});

myBrewsBtn.addEventListener('click', e => {
    window.location = 'brews.html'
});

/* #endregion Nav Functionality */