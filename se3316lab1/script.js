const countryTextInput = document.getElementById("searchByCountryName"); //gets the input from text box for the countries
const divULResults = document.getElementById("resultsSearchDisplay"); //reference the ul within the div


//from lab 1, input validation for search bars

const currencyTextInput = document.getElementById("searchByCurrency");

currencyTextInput.addEventListener("input", function() { //event listener for the currency text input
  let searchCurrencyValue = currencyTextInput.value; //temporary variable to hold value with restrictions

  searchCurrencyValue = searchCurrencyValue.toUpperCase(); //function toUpperCase automatically changes inputted text to uppercase
  const stopChar = searchCurrencyValue.replace(/[^A-Z]/g, ''); //replace prevents any characters not uppercase letters from being inputted
  const maxCharInput = stopChar.slice(0, 3); //characters are prevented from being inputted over three letter
  currencyTextInput.value = maxCharInput; //sets the text input for currency to max amount of characters and no numbers

});


countryTextInput.addEventListener("input", function() { //event listener for the currency text input
  const searchCountryValue = countryTextInput.value;    //temporary variable to hold value with restrictions
  const stopNum = searchCountryValue.replace(/[0-9]/g, ''); //replace function refers to all numbers and replaces them with an empty character
  const maximumCharacterInput = stopNum.slice(0, 20); //prevents more than 20 characters from being entered
  countryTextInput.value = maximumCharacterInput; //set the text input for countries to max char and no numbers input

});




