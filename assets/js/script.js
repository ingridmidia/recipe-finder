// Add event listener for the food search form
var foodSearch = document.getElementById("foodSearch");
foodSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSearch("userInputFood", "./food-results.html", "food");
});

// Add event listener for the drink search form
var drinkSearch = document.getElementById("drinkSearch");
drinkSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSearch("userInputDrink", "./drink-results.html", "drink");
});

function handleSearch(inputId, redirectUrl, type) {
  var userInput = document.getElementById(inputId).value.trim();
  var errorElementId = type === "food" ? "foodError" : "drinkError";
  var errorElement = document.getElementById(errorElementId);

  if (!userInput) {
    errorElement.textContent = "Please enter a value in the input field!";
    errorElement.style.display = "block"; // Show the error message
    return;
  } else {
    errorElement.style.display = "none"; // Hide the error message
  }

  // Update the displayed recent searches immediately
  displayRecentSearches();

  // Redirect to the results page
  var url = redirectUrl + "?q=" + userInput;
  location.assign(url);
}

function displayRecentSearches() {
  displayRecentSearchesByType("food", ".recentFoodButtons");
  displayRecentSearchesByType("drink", ".recentDrinkButtons");
}

function displayRecentSearchesByType(type, selector) {
  var storageKey =
    type === "food" ? "recentFoodSearches" : "recentDrinkSearches";
  var recentSearches = JSON.parse(localStorage.getItem(storageKey)) || [];
  var recentButtonsSection = document.querySelector(selector);

  // Clear any existing search buttons
  recentButtonsSection.innerHTML = "";

  // Create and append a button for each recent search
  recentSearches.forEach(function (searchTerm) {
    var btn = document.createElement("button");
    btn.classList.add("is-dark", "button", "is-small", "is-rounded");
    btn.innerText = searchTerm;
    btn.addEventListener("click", function () {
      replaySearch(searchTerm, type);
    });
    recentButtonsSection.appendChild(btn);
  });

  if (recentSearches.length > 0) {
    if (type === "food") {
      document
        .getElementById("food-search-history")
        .classList.remove("is-hidden");
    } else {
        document
         .getElementById("drink-search-history")
        .classList.remove("is-hidden");
    }
  }
}

function replaySearch(searchTerm, type) {
  var redirectUrl =
    type === "food" ? "./food-results.html" : "./drink-results.html";

  // Redirect to the appropriate results page
  var url = redirectUrl + "?q=" + searchTerm;
  location.assign(url);
}

// Call this function on page load to display recent searches
displayRecentSearches();
