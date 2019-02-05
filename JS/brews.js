
const addBrewBtn = document.getElementById('brews.add-brew-button');
const addBrewDialog = document.getElementById('brews.add-brew-dialog');

addBrewBtn.addEventListener('click', e => {
    addBrewDialog.setAttribute('open', '');
    addBrewBtn.setAttribute('disabled', '');
});