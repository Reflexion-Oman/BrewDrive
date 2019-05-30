/* #region Firestore Elements */
const firestore = firebase.firestore();
const settings = {/* your settings... */};
firestore.settings(settings);
const auth = firebase.auth();
/* #endregion Firestore Elements */

/* #region Log In and Sign Up */

// Element instantiation
const emailHTML = document.getElementById('login.email');
const usernameHTML = document.getElementById('login.username');
const passwordHTML = document.getElementById('login.password');
const loginBtn = document.getElementById('login.log-in-button');
const signupBtn = document.getElementById('login.sign-up-button');

// Log In Event Protocol
loginBtn.addEventListener('click', e => {
    let email = emailHTML.value;
    let username = usernameHTML.value;
    let password = passwordHTML.value;
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
});

// Sign Up Event Protocol
signupBtn.addEventListener('click', e => {
    let email = emailHTML.value;
    let username = usernameHTML.value;
    let password = passwordHTML.value;
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
});

// Authorization State Handler
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        window.location = "index.html";
    } else {
        console.log('Not logged in');
    }
});

/* #endregion Log In and Sign Up */