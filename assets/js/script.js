var foodSearch = document.getElementById("foodSearch");

foodSearch.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var userInputFood = document.getElementById("userInputFood").value;

    var url = "./food-results.html?q=" + userInputFood;
    location.assign(url);
});

var drinkSearch = document.getElementById("drinkSearch");

drinkSearch.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var userInputDrink = document.getElementById("userInputDrink").value;

    var url = "./drink-results.html?q=" + userInputDrink;
    location.assign(url);
});

function saveSearchQuery(query) {}