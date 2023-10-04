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

                result.addEventListener("click", function (event) {
                    var recipeName = event.target.innerText;
                    console.log(recipeName);

                    var API_RecipeURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipeName;
                    console.log(API_RecipeURL);

                    fetch(API_RecipeURL)
                        .then(function (response) {
                            if (!response.ok) {// validates input
                                throw response.json();
                            }
                            return response.json();
                        })
                    .then(function (data) {
                        console.log(data);
                        
                        var recipeCardEl = document.getElementById("recipeCard");
                        var mealTitleEl = document.createElement("ul")
                        
                        mealTitleEl.textContent = data.meals[0].strMeal;
                        
                        
                        recipeCardEl.appendChild(mealTitleEl);
                    })
                })
            }}
        else {
                        for(var i = 0; i< 5; i++) {
                    var results = document.getElementById("food-results");
                    var result = document.createElement("button");
                    result.textContent = data.meals[i].strMeal;
                    results.appendChild(result);

                    result.addEventListener("click", function (event) {
                        var recipeName = event.target.innerText;
                        console.log(recipeName);
                    })
                }
            }
        })
    .catch(function () {
        var results = document.getElementById("food-results");
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, no recipes found with this ingredient!"; // TODO: bigger font size and red
        results.appendChild(errorMessage);
    })