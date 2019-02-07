var storageRef = firebase.storage().ref();

const addBrewBtn = document.getElementById('brews.add-brew-button');
const addBrewDialog = document.getElementById('brews.add-brew-dialog');
const addBrewForm = document.getElementById('add-brew-dialog.form');
const addBrewCancelBtn = document.getElementById('add-brew-dialog.cancel-button');
const addBrewAddBtn = document.getElementById('add-brew-dialog.add-button');

let file;
let newFilename;

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

function addBrewInfo(name, brewery, location, style, shade, description) {
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
            console.log('Added ' + key + ' to your brew drive');
        }
        else {
            console.log(name + ' already exists in your brew drive');
        }
    });
}

function addBrew(name, brewery, location, style, shade, image, description) {

    // Add text info doc to Brew Info collection
    addBrewInfo(name, brewery, location, style, shade, description);

    // Store image in db
    storeImage(image)

    // Render in color category container
    renderBrewImage(shade, image);
}

function storeImage(image) {
    let newBrewDoc = brewCollect.doc(newFilename);
    newBrewDoc.get().then(function(doc) {
        if (doc || doc.exists) {
            console.log(newFilename + ' already exists in storage');
        }
        else {
            var filename = user.email + '/' + newFilename + '.png';
            var imageRef = storageRef.child(filename);
            var file = image;
            imageRef.put(file).then(function(snapshot) {
                console.log(newFilename + ' added to db storage');
            });
        }
    });
}

function renderBrewImage(shade, image) {
    switch (shade) {
        case 'Light': shade = 'light';
        case 'Fair': shade = 'fair';
        case 'Dark': shade = 'dark';
    }

    let container = document.getElementById('brews.' + shade + '-container');
    let imgHTML = document.createElement('img');
    let src = URL.createObjectURL(image);
    imgHTML.setAttribute('src', src);
    imgHTML.setAttribute('style', 'max-height: 150px; max-width: 100px');
    container.appendChild(imgHTML);
}



/* #endregion Form Related Functions */