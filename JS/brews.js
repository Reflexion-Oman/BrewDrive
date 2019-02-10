var storageRef = firebase.storage().ref();

const addBrewBtn = document.getElementById('brews.add-brew-button');
const addBrewDialog = document.getElementById('brews.add-brew-dialog');
const addBrewForm = document.getElementById('add-brew-dialog.form');
const addBrewCancelBtn = document.getElementById('add-brew-dialog.cancel-button');
const addBrewAddBtn = document.getElementById('add-brew-dialog.add-button');

let file;
let newFilename;

// Authorization State Handler
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

        // store for db use
        user = firebaseUser;
        userEmail = firebaseUser.email;
        userCollect = firestore.collection('Users');
        userDoc = userCollect.doc('user-' + userEmail);
        brewCollect = userDoc.collection('My Brews');
        isUser(userEmail);
        renderDBImages();
    } else {
        window.location = 'login.html';
    }
});


/* #region Button Protocols */

addBrewBtn.addEventListener('click', e => {
    addBrewDialog.setAttribute('open', '');
    addBrewBtn.setAttribute('disabled', '');
});

addBrewCancelBtn.addEventListener('click', e => {
    resetAddBrewForm();
});

addBrewAddBtn.addEventListener('click', e => {
    let name = document.getElementById('add-brew-dialog.brew-name-input');
    let brewery = document.getElementById('add-brew-dialog.brewery-name-input');
    let location = document.getElementById('add-brew-dialog.brewery-location-input');
    let style = document.getElementById('add-brew-dialog.brew-style');
    let shade = document.getElementById('add-brew-dialog.brew-color');
    let description = document.getElementById('add-brew-dialog.brew-description');
    let image = file;
    addBrew(name.value, brewery.value, location.value, style.value, shade.value, image, description.value);
    resetAddBrewForm();
});

/* #endregion Button Protocols */

/* #region Form Related Functions */

// Renders image in add brew dialog
dialogUploadPreview = event => {
    let preview = document.getElementById('add-brew-dialog.brew-image-preview');
    preview.src = URL.createObjectURL(event.target.files[0]);
    let image = event.target.files[0];
};

// Retrieve from HTML input
storeFile = event => {
    file = event.target.files[0];
}

function resetAddBrewForm() {
    addBrewForm.reset();
    document.getElementById('add-brew-dialog.brew-image-preview').src = "#";
    addBrewDialog.removeAttribute('open');
    addBrewBtn.removeAttribute('disabled');
}

function addBrewInfo(name, brewery, location, style, shade, description, image) {
    let key = name + ' - ' + brewery + ', ' + location;
    newFilename = key;
    let newBrewDoc = brewCollect.doc(key);
    newBrewDoc.get().then(function(doc) {
        if (!doc || !doc.exists) {
            newBrewDoc.set({
                name: name,
                brewery: brewery,
                location: location,
                style: style,
                shade: shade,
                description: description
            });
            userData.myBrewCount++;
            userDoc.update(userData);
            storeImage(image);
            console.log('Added ' + key + ' to your brew drive');
        }
        else {
            console.log(name + ' already exists in your brew drive');
        }
    });
}

function addBrew(name, brewery, location, style, shade, image, description) {

    // Add text info doc to Brew Info collection
    addBrewInfo(name, brewery, location, style, shade, description, image);
                
    // Render in color category container
    let caption = name + ' - ' + brewery;
    renderBrewImage(shade, image, caption);
}

function storeImage(image) {
    var filename = user.email + '/' + newFilename + '.png';
    var imageRef = storageRef.child(filename);
    var file = image;
    imageRef.put(file).then(function(snapshot) {
        console.log(newFilename + ' added to db storage');
    });
}

function shadeSwitch(shade) {
    if (shade == "Light") {
        return 'light';
    }
    else if (shade == "Fair") {
        return 'fair';
    }
    else if (shade == "Heavy") {
        return 'heavy'
    }
    return 'unlabeled';
}

function renderBrewImage(shade, image, caption) {
    shade = shadeSwitch(shade); // call to format shade string

    // element references
    let container = document.getElementById('brews.' + shade + '-container');
    let imgHTML = document.createElement('img');
    let figureHTML = document.createElement('figure');
    let figcaptionHTML = document.createElement('figcaption');

    // set attributes of image structure
    let src = URL.createObjectURL(image);
    imgHTML.setAttribute('src', src);
    imgHTML.setAttribute('style', 'max-height: 150px; max-width: 100px');
    figureHTML.setAttribute('id', 'brews.' + shade + '-' + caption);
    figcaptionHTML.innerText = caption;

    // construct the element sub-dom
    figureHTML.appendChild(imgHTML);
    figureHTML.appendChild(figcaptionHTML);
    container.appendChild(figureHTML);
}

function renderFromStorage(shade, image, caption) {



    shade = shadeSwitch(shade); // call to format shade string

    // element references
    let container = document.getElementById('brews.' + shade + '-container');
    let imgHTML = document.createElement('img');
    let figureHTML = document.createElement('figure');
    let figcaptionHTML = document.createElement('figcaption');

    // set attributes of image structure
    imgHTML.setAttribute('src', image);
    imgHTML.setAttribute('style', 'max-height: 150px; max-width: 100px');
    figureHTML.setAttribute('id', 'brews.' + shade + '-' + caption);
    figcaptionHTML.innerText = caption;

    // construct the element sub-dom
    figureHTML.appendChild(imgHTML);
    figureHTML.appendChild(figcaptionHTML);
    container.appendChild(figureHTML);
}

function renderDBImages() {
    var imagesRef = storageRef.child(userEmail);
    brewCollect.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let brewData = doc.data();
            let brewShade = brewData.shade;
            let caption = brewData.name + " | " + brewData.brewery;
            let filename = doc.id + ".png";
            let dbImageRef = imagesRef.child(filename).getDownloadURL().then(function(url) {
                renderFromStorage(brewShade, url, caption);
            });
        });
    });
}

/* #endregion Form Related Functions */