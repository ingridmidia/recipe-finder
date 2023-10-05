var ingredient = document.location.search.split("=")[1];
var API_FoodURL = "https://cors-anywhere.herokuapp.com/www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
var ingredientsArray = [];

fetch(API_FoodURL)
    .then(function (response) {
        if (!response.ok) {// validates input
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (var i = 0; i < data.meals.length; i++) { // error if i is less than 5
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
                        for (var i = 1; i <= 20; i++) {
                            var ingredientKey = `strIngredient${i}`;
                            var measurementKey = `strMeasure${i}`;
                            console.log(data.meals[0][ingredientKey]);
                            if (data.meals[0][ingredientKey] && data.meals[0][ingredientKey].trim() !== "") {
                                if (data.meals[0][measurementKey] && data.meals[0][measurementKey].trim() !== "") {
                                    ingredientsArray.push({ ingredient: data.meals[0][ingredientKey], measurement: data.meals[0][measurementKey] })
                                }
                            }
                        }
                        var recipeCardEl = document.getElementById("recipeCard");
                        var mealTitleEl = document.createElement("ul");
                        recipeCardEl.appendChild(mealTitleEl);
                        mealTitleEl.textContent = data.meals[0].strMeal;
                        for (var i = 0; i < ingredientsArray.length; i++) {
                            var ingredientEl = document.createElement("li")
                            ingredientEl.textContent = ingredientsArray[i].measurement + " " + ingredientsArray[i].ingredient;
                            recipeCardEl.appendChild(ingredientEl);
                        }
                        var instructionsTitle = document.createElement("p");
                        instructionsTitle.textContent = "Instructions";
                        recipeCardEl.appendChild(instructionsTitle);
                        instructionsTitle.textContent = data.meals[0].strInstructions;
                    })
            })
        }
    })
    .catch(function () {
        var results = document.getElementById("food-results");
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, no recipes found with this ingredient!"; // TODO: bigger font size and red
        results.appendChild(errorMessage);
    })