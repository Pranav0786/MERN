const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_{}[]|,.<>?:';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// set strength circle to grey
setIndicator("#ccc") ;


// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min ;
    const max = inputSlider.max ;
    inputSlider.style.backgroundSize = ( (passwordLength-min)*100 /(max-min)) + "% 100" ;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
    // indicator.style.boxShadow = '0px 0px 12px 1px ${color}' ;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandNumber() {
    return getRndInteger(0, 10); // Corrected to 10 to include 9
}

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8)
        setIndicator("#0f0");
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)
        setIndicator("#ff0");
    else
        setIndicator("#f00");
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    // make span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    // Fisher-Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    // none of the checkboxes
    if (checkCount <= 0)
        return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start generating a new password

    // remove old password
    password = "";

    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUppercase);
    if (lowercaseCheck.checked)
        funcArr.push(generateLowercase);
    if (numbersCheck.checked)
        funcArr.push(generateRandNumber);
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);
    // compulsory addition
    for (let i = 0; i < funcArr.length; i++)
        password += funcArr[i]();
    // remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIdx = getRndInteger(0, funcArr.length);
        password += funcArr[randIdx]();
    }
    // shuffle the password
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    // strength
    calcStrength();
})
