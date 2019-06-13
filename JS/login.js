class Login {
    constructor() {
        this.firestore = firebase.firestore();
        this.auth = firebase.auth();
        this.elements = {
            EMAIL: '#login-form .email',
            PASSWORD: '#login-form .password',
            LOGIN: '#login-form .exists',
            SIGNUP: '#login-form .new-users'
        }
    }

    // Firebase auth getter
    instance() {
        return this.auth;
    }

    // Enumerator for page element objects
    element(enumeration) {
        let element;
        switch (enumeration) {
            case 'EMAIL':
                element = document.querySelector(this.elements.EMAIL);
                break;
            case 'PASSWORD':
                element = document.querySelector(this.elements.PASSWORD);
                break;
            case 'LOGIN':
                element = document.querySelector(this.elements.LOGIN);
                break;
            case 'SIGNUP':
                element = document.querySelector(this.elements.SIGNUP);
                break;
            default:
                console.log('Invalid enumeration passed to login');
                return;
        }
        return element;
    }

    // What to do when login button is clicked
    loginListener() {
        // Fetch the input values.
        let email = this.element('EMAIL').value;
        let password = this.element('PASSWORD').value;

        // Firebase auth calls using input values
        const promise = this.auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    }

    // What to do when signup button is clicked
    signupListener() {
        // Fetch input values
        let email = this.element('EMAIL').value;
        let password = this.element('PASSWORD').value;

        // Firebase auth calls using input values
        const promise = this.auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    }

    // Adds event listeners to buttons
    activateButtons() {
        // Fetch the button elements.
        let loginBtn = this.element('LOGIN');
        let signupBtn = this.element('SIGNUP');

        // Add the event listeners.
        loginBtn.addEventListener('click', e => {
            this.loginListener();
        });

        signupBtn.addEventListener('click', e => {
            this.signupListener();
        });
    }
}

let login = new Login();
login.activateButtons();

// Authorization State Handler
login.instance().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        window.location = "index.html";
    }
});

/* #endregion Log In and Sign Up */