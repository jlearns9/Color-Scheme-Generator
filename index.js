/* eslint-disable no-alert */
/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */

// DOM Elements
const colorSchemeInputEl = document.querySelector('.color-scheme__input');
const colorSchemeSelectorEl = document.querySelector('.color-scheme__selector');
const colorSchemeBtn = document.querySelector('.color-scheme__button');
const colorSchemeDisplayEl = document.querySelector('.color-scheme__display');

// Variables
let selectedColor = 'f55a5a'; // Default color
let selectedScheme = 'monochrome'; // Default scheme

// Function Variables
const initializePage = () => getColorSchemeFromApi();
const updateSelectedColor = () => (selectedColor = colorSchemeInputEl.value.slice(1)); // removes #
const updateSelectedScheme = () => (selectedScheme = colorSchemeSelectorEl.value);

// Function Declarations
function getColorSchemeFromApi() {
  colorSchemeDisplayEl.innerHTML = '';
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedScheme}`,
  )
    .then((res) => res.json())
    .then((data) => {
      colorSchemeDisplayEl.innerHTML = data.colors
        .map(
          (color) => `
                <div class='display-container'>
                    <div class='display-color' style='background-color: ${color.hex.value}'></div>
                    <div class='display-title'>${color.hex.value}</div>
                </div>`,
        )
        .join('');
    });
}

function handleTitleClick(event) {
  if (event.target.classList.contains('display-title')) {
    navigator.clipboard
      .writeText(event.target.textContent)
      .then(() => alert('Copied to clipboard'));
  }
}

// Event Listeners
initializePage(); // document.addEventListener('DOMContentLoaded', initializePage)
colorSchemeDisplayEl.addEventListener('click', handleTitleClick);
colorSchemeBtn.addEventListener('click', () => {
  updateSelectedColor(), updateSelectedScheme(), getColorSchemeFromApi();
});
