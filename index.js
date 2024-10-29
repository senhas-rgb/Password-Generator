const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["1","2","3","4","5","6","7","8","9","0"];
const char = ["!","@","#","$","%","^","&","*","(",")","-","_","=","+","\"","|",",","{","}",";",":","/","?"]

let password = [];

const generateBtn = document.querySelector("#general-btn");
const copyBtn = document.querySelector("#copy-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
const inputBox = document.querySelector("#input-box");

const letterRange = document.querySelector("#letter-range");
const numberRange = document.querySelector("#number-range");
const charRange = document.querySelector("#char-range");

const letterCheck = document.querySelector("#letter-check");
const numberCheck = document.querySelector("#number-check");
const charCheck = document.querySelector("#char-check");

function genLetters() {
    for (let i=0; i<letterRange.value; i++){
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        password.push(randomLetter);
    }
}

function genNumbers() {
    for (let i=0; i<numberRange.value; i++){
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        password.push(randomNumber);
    }
}

function genChars() {
    for (let i=0; i<charRange.value; i++){
        const randomChar = char[Math.floor(Math.random() * char.length)];
        password.push(randomChar);
    }
}

function shuffle() {
    for (let i = password.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i));
        [password[i], password[randomIndex]] = [password[randomIndex], password[i]];
    }
}

generateBtn.addEventListener("click", () => {
    let checkboxNotSelected = 0;
    password = [];

    if (letterCheck.checked) {
        genLetters();
    } else {
        ++checkboxNotSelected;
    }

    if (numberCheck.checked) {
        genNumbers();
    } else {
        ++checkboxNotSelected;
    }

    if (charCheck.checked) {
        genChars();
    } else {
        ++checkboxNotSelected;
    }

    if (checkboxNotSelected == 3) {
        alert("Select at least one option from below")
        return;
    }

    if (letterRange.value > 10 || numberRange.value > 10 || charRange.value > 10) {
        alert("Maximum limit is 10")
        return;
    }
    if (letterRange.value < 1 || numberRange.value < 1 || charRange.value < 1) {
        alert("Minimum limit is 1")
        return;
    }

    shuffle();

    inputBox.value = password.toString().replaceAll(",","");
    copyBtn.style.display = "inline-block"
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(inputBox.value);
    alert("Copied to clipboard");
})

shuffleBtn.addEventListener("click", () => {
    shuffle();
    inputBox.value = password.toString().replaceAll(",","");
})

letterCheck.addEventListener("click", () => {
    letterRange.classList.toggle("display")
})

numberCheck.addEventListener("click", () => {
    numberRange.classList.toggle("display")
})

charCheck.addEventListener("click", () => {
    charRange.classList.toggle("display")
})

function redirectLink(link) {
    return window.location.replace(link)
}
