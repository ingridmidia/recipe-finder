var ingredient = document.location.search.split("=")[1];
var API_FoodURL = "https://cors-anywhere.herokuapp.com/www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

fetch(API_FoodURL)
    .then(function (response) {
        if (!response.ok) {// validates input
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.meals.length < 5 || data.meals.length < 4) {
            for (var i = 0; i < 3; i++) { // error if i is less than 5
                var results = document.getElementById("food-results");
                var result = document.createElement("button");
                result.textContent = data.meals[i].strMeal;
                results.appendChild(result);
            }
        } else {
            for (var i = 0; i < 5; i++) {
                var results = document.getElementById("food-results");
                var result = document.createElement("button");
                result.textContent = data.meals[i].strMeal;
                results.appendChild(result);
            }
        }
    })
    .catch(function () {
        var results = document.getElementById("food-results");
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, no recipes found with this ingredient!"; // TODO: bigger font size and red
        results.appendChild(errorMessage);
    })