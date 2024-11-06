// Arrays containing possible characters for password generation
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const numbers = '0123456789'.split('');
const char = '!@#$%^&*()-_=+"|,{};:/?'.split('');

// Store the generated password
let password = [];

// DOM element selections
const generateBtn = document.querySelector('#generate-btn');
const copyBtn = document.querySelector('#copy-btn');
const shuffleBtn = document.querySelector('#shuffle-btn');
const inputBox = document.querySelector('#input-box');

// Range input selections
const letterRange = document.querySelector('#letter-range');
const numberRange = document.querySelector('#number-range');
const charRange = document.querySelector('#char-range');

// Checkbox selections
const letterCheck = document.querySelector('#letter-check');
const numberCheck = document.querySelector('#number-check');
const charCheck = document.querySelector('#char-check');

/**
 * Gets a random element from an array
 * @param {Array} arr - The array to select from
 * @returns {*} A random element from the array
 */
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates an array of random elements
 * @param {Array} arr - Source array
 * @param {number} count - Number of elements to generate
 * @returns {Array} Array of random elements
 */
function generateElements(arr, count) {
    return Array.from({length: count}, () => getRandomElement(arr));
}

// Generator functions for each character type
function genLetters() {
    password.push(...generateElements(letters, parseInt(letterRange.value)));
}

function genNumbers() {
    password.push(...generateElements(numbers, parseInt(numberRange.value)));
}

function genChars() {
    password.push(...generateElements(char, parseInt(charRange.value)));
}

/**
 * Shuffles the password array using Fisher-Yates algorithm
 */
function shuffle() {
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }
}

/**
 * Validates the range inputs
 * @returns {boolean} True if valid, false otherwise
 */
function validateRanges() {
    const ranges = [letterRange, numberRange, charRange];
    const value = range => parseInt(range.value);
    
    if (ranges.some(range => value(range) > 10)) {
        alert('Maximum limit is 10');
        return false;
    }
    if (ranges.some(range => value(range) < 1)) {
        alert('Minimum limit is 1');
        return false;
    }
    return true;
}

// Event Listeners
generateBtn.addEventListener('click', () => {
    password = [];
    const checks = [
        [letterCheck, genLetters],
        [numberCheck, genNumbers],
        [charCheck, genChars]
    ];

    const selectedOptions = checks.filter(([check]) => check.checked);
    
    if (!selectedOptions.length) {
        alert('Select at least one option from below');
        return;
    }

    if (!validateRanges()) return;

    selectedOptions.forEach(([, generator]) => generator());
    shuffle();
    
    inputBox.value = password.join('');
    copyBtn.style.display = 'inline-block';
});

// Copy button functionality
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(inputBox.value);
        alert('Copied to clipboard');
    } catch (err) {
        alert('Failed to copy to clipboard');
    }
});

// Shuffle button functionality
shuffleBtn.addEventListener('click', () => {
    shuffle();
    inputBox.value = password.join('');
});

/**
 * Creates a toggle handler for range inputs
 * @param {HTMLElement} range - The range input element
 * @returns {Function} Toggle handler function
 */
function createToggleHandler(range) {
    return () => range.classList.toggle('display');
}

// Add toggle handlers to checkboxes
letterCheck.addEventListener('click', createToggleHandler(letterRange));
numberCheck.addEventListener('click', createToggleHandler(numberRange));
charCheck.addEventListener('click', createToggleHandler(charRange));
