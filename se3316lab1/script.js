const countryTextInput = document.getElementById("searchByCountryName"); //gets the input from text box for the countries
const divULResults = document.getElementById("resultsSearchDisplay"); //reference the ul within the div

function getHTMLCountryData() {
  const dataListITems = []; // stores extracted list 
  const itemList = document.querySelectorAll("#resultsSearchDisplay li"); // selects li elements

  itemList.forEach(li => {
      const countryName = li.querySelector("h2").innerText; //selects name as header 
      const imageSrc = li.querySelector("img").src;  //selects list items for images from HTML file
      const countryCurrency = li.querySelector("p").innerText.split(":")[1].trim(); //gets the currency from HTML file
      const regionsOfCountry = li.querySelectorAll("p")[1].innerText.split(":")[1].trim(); //gets the regions of each country
      const link = li.querySelector("a").href; // gets the link from the HTML document
      
      const itemData = { //creates structure to hold all data
          name: countryName,
          imageSrc: imageSrc,
          currency: countryCurrency,
          regions: regionsOfCountry,
          link
      };

      dataListITems.push(itemData); // adds the extracted data to the array
  });

  return dataListITems; //returns dataList items 
}

const countriesData = getHTMLCountryData();

function searchCountriesByNameforDivSearch(searchBarInput) { //function to search through div's unordered list elemeents
  const results = countriesData.filter(country =>   //filters input using query input 
    country.name.toLowerCase().includes(searchBarInput.toLowerCase()) //changes input to lowercase to avoid case sensititivty
  );

  return results;
}

function searchCountriesByCurrencyForDivSearch(searchBarInput) {
  return countriesData.filter(country => 
      country.currency.toLowerCase().includes(searchBarInput.toLowerCase())
  );
}

countryTextInput.addEventListener("input", function() { //event listener for searching
    
    if(countryTextInput.value.trim() === "") {    //when there is no input, hide the options
        divULResults.style.display = "none";
    } else {
        divULResults.style.display = "block"; //blocks style display of hiding if text is input

        while (divULResults.firstChild) { //removes current searc results
            divULResults.removeChild(divULResults.firstChild);
        }
        
        var queryInput = countryTextInput.value.toLowerCase(); //retrieve search input and search
        var results = searchCountriesByNameforDivSearch(queryInput);

        var unorderedListElement = document.getElementById("resultsSearchDisplay"); //creats clone of unordered list elements for resultsSearchDisplay UL
        var unorderedListClone = unorderedListElement.cloneNode(true);

        //loops through every list element 
        results.forEach(function(result) {
            var liItem = document.createElement("li"); //for all unordered list items create element 
            liItem.className = "list-item";  // Apply the shared class

            var countryName = document.createElement("h2"); //creates elements from all h2 headings which includes the title
            countryName.textContent = result.name;          //grabbed from the HTML file

            var imageRef = document.createElement("img"); //creates elements for all unordered list item information 
            imageRef.src = result.imageSrc; 

            var currencyElement = document.createElement("p");
            currencyElement.textContent = "Currency: " + result.currency;

            var regionsElement = document.createElement("p");
            regionsElement.textContent = "Regions: " + result.regions;

            var linkRef = document.createElement("a"); //grab href items 
            linkRef.href = result.link; 
            linkRef.textContent = "Wikipedia Link";
            linkRef.target = "_blank"; 

            
            liItem.appendChild(countryName); //appends child to all serach results
            liItem.appendChild(imageRef);
            liItem.appendChild(currencyElement);
            liItem.appendChild(regionsElement); 
            liItem.appendChild(linkRef);

            unorderedListClone.appendChild(liItem); //clones items 
        });

        divULResults.appendChild(unorderedListClone); //add cloned item to the div unordered search results list
    }
});


document.addEventListener("HideDivUL", function() { //hides the div before search
  divULResults.style.display = "none";
});

//from lab 1, input validation for search bars

const currencyTextInput = document.getElementById("searchByCurrency");
const divCurrencyResults = document.getElementById("resultsSearchDisplay"); // Assume a different results div for currency search

//same logic for currency search bar
currencyTextInput.addEventListener("input", function() {
    if(currencyTextInput.value.trim() === "") {    
        divCurrencyResults.style.display = "none"; // Hide the results div when input is empty
    } else {
        divCurrencyResults.style.display = "block"; // Show the results div when input is present
        
        while (divCurrencyResults.firstChild) { 
            divCurrencyResults.removeChild(divCurrencyResults.firstChild); // Clear previous results
        }
        
        var queryInput = currencyTextInput.value.toLowerCase();
        var results = searchCountriesByCurrencyForDivSearch(queryInput); // Use the new search function

        var unorderedListElement = document.getElementById("resultsSearchDisplay"); 
        var unorderedListClone = unorderedListElement.cloneNode(true);
        
        results.forEach(function(result) {
            var liItem = document.createElement("li"); 
            liItem.className = "list-item";  

            var countryName = document.createElement("h2"); 
            countryName.textContent = result.name;          

            var imageRef = document.createElement("img"); 
            imageRef.src = result.imageSrc; 

            var currencyElement = document.createElement("p");
            currencyElement.textContent = "Currency: " + result.currency;

            var regionsElement = document.createElement("p");
            regionsElement.textContent = "Regions: " + result.regions;

            var linkRef = document.createElement("a"); 
            linkRef.href = result.link; 
            linkRef.textContent = "Wikipedia Link";
            linkRef.target = "_blank"; 

            liItem.appendChild(countryName); 
            liItem.appendChild(imageRef);
            liItem.appendChild(currencyElement);
            liItem.appendChild(regionsElement); 
            liItem.appendChild(linkRef);

            unorderedListClone.appendChild(liItem); 
        });

        divCurrencyResults.appendChild(unorderedListClone); 
    }
});

document.addEventListener("DOMContentLoaded", function() { //hides the div before loading 
  divCurrencyResults.style.display = "none";
});

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




