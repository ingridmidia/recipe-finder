var ingredient = document.location.search.split("=")[1];
var API_FoodURL = "https://cors-anywhere.herokuapp.com/www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

fetch(API_FoodURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.meals.length < 5 || data.meals.length < 4) {
            for (var i = 0; i < 3; i++) { // error if i is less than 5
                console.log(data.meals[i].strMeal);
                var results = document.getElementById("results");
                var result = document.createElement("button");
                result.textContent = data.meals[i].strMeal;
                results.appendChild(result);
            }
        } else {
            for (var i = 0; i < 5; i++) {
                console.log(data.meals[i].strMeal);
                var results = document.getElementById("results");
                var result = document.createElement("button");
                result.textContent = data.meals[i].strMeal;
                results.appendChild(result);
            }
        }
    })