//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const randomFunc = {
    lower :getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};
// copy generated password to the clipboard

clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

//We have two buttons so there will be two events
//function to check which of the inputs are ticked by user

generateEl.addEventListener('click',() => {
    const length = +lengthEl.value; //+ will conv the string to number, we can use parsetoint as well
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl .checked;
resultEl.innerText = generatePassword(
hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
);
});

function generatePassword(lower,upper,number,symbol,length){
    //initialise password variable
    //Remove the unchecked types
    //loop over thee length
    //generator function for each type
    // add the final password to password variable and add it to textarea;
    
    //count the number of checked items
    const typeCount = lower + upper + number + symbol;
// get the key val pair key can be obtainer by wrapping the element in {}
    const typeArr = [{ lower }, { upper },{ number },{ symbol }].filter(item => Object.values(item)[0]);
    //use the filter method to remove unchecked items
    
    if(typeCount === 0)
        return '';
    for(let i = 0; i< length; i+=typeCount){
        typeArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName]();
        });
    }
//slicing the password to get the desired length bcoz we are looping through number of checked items so it may happen sometimes that the desired length is less and number of checked item is more, eg length of pwd we want is 2 and we have checked all the types so it will give a pwd of length 4,so we need to slice the generated password upto its length
    const finalPassword = generatePassword.slice(0,length);
    return finalPassword;
}

//Generator functions
// generate random lowercase letters
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}
//fromCharCode gives the corresponding letter to the input number
//Math.random generates randm decimal number and to have 26 alpha letters multiply with 26 and this still returns float hence take floor value of it.
//generate random uppercase letters
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}
function getRandomSymbols(){
    const symbols = '!@#$(){}[]=<>/,.&*%?'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
