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

            var h2 = document.createElement("h2"); //creates elements from all h2 headings which includes the title
            h2.textContent = result.name;          //grabbed from the HTML file

            var img = document.createElement("img"); //creates elements for all unordered list item information 
            img.src = result.imageSrc; 

            var currencyP = document.createElement("p");
            currencyP.textContent = "Currency: " + result.currency;

            var regionsP = document.createElement("p");
            regionsP.textContent = "Regions: " + result.regions;

            var linkA = document.createElement("a"); //grab href items 
            linkA.href = result.link; 
            linkA.textContent = "Wikipedia Link";
            linkA.target = "_blank"; 

            
            liItem.appendChild(h2); //appends child to all serach results
            liItem.appendChild(img);
            liItem.appendChild(currencyP);
            liItem.appendChild(regionsP); 
            liItem.appendChild(linkA);

            unorderedListClone.appendChild(liItem); //clones items 
        });

        divULResults.appendChild(unorderedListClone); //add cloned item to the div unordered search results list
    }
});

// Ensure the div is hidden on page load
document.addEventListener("HideDivUL", function() {
  divULResults.style.display = "none";
});

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




