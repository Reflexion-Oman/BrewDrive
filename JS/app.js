/* #region Firestore Elements */

const auth = firebase.auth();

/* #endregion Firestore Elements */

const logoutBtn = document.getElementById('log-out-button');
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
        window.location = 'login.html';
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