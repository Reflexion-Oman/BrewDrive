/* #region Firestore Elements */

const firestore = firebase.firestore();
const settings = {/* your settings... */};
firestore.settings(settings);
const auth = firebase.auth();

/* #endregion Firestore Elements */

const logoutBtn = document.getElementById('index.log-out-button');
const homeBtn = document.getElementById('nav.home');
const myBrewsBtn = document.getElementById('nav.my-brews');
const exploreBtn = document.getElementById('nav.explore');

// Authorization State Handler
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // Log Out Event Protocol
        logoutBtn.addEventListener('click', e =>{
            auth.signOut();
            window.location = 'login.html';
        });
    } else {
        window.location = 'login.html'
        console.log('Not logged in');
    }
});

/* #region Nav Functionality */

homeBtn.addEventListener('click', e => {
    window.location = 'index.html';
});

myBrewsBtn.addEventListener('click', e => {
    window.location = 'brews.html'
});

/* #endregion Nav Functionality */