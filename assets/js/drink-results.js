var alcohol = document.location.search.split("=")[1];
var API_DrinkURL = "https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;

fetch(API_DrinkURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.drinks.length < 5 || data.drinks.length < 4) {
            for (var i = 0; i < 3; i++) { // error if i is less than 5
                console.log(data.drinks[i].strMeal);
                var results = document.getElementById("drink-results");
                var result = document.createElement("button");
                result.textContent = data.drinks[i].strDrink;
                results.appendChild(result);
            }
        } else {
            for (var i = 0; i < 5; i++) {
                var results = document.getElementById("drink-results");
                var result = document.createElement("button");
                result.textContent = data.drinks[i].strDrink;
                results.appendChild(result);
            }
        }
    })