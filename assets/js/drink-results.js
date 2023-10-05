var alcohol = document.location.search.split("=")[1];
var API_DrinkURL = "https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;
var ingredientsArray = [];

fetch(API_DrinkURL)
    .then(function (response) {
        if (!response.ok) {// validates input
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.drinks.length < 5) {
            data = data.drinks;
            showRecipes(data);
        } else {
            data = data.drinks.slice(0, 5);
            showRecipes(data);
        }

    })
    .catch(function () {
        var results = document.getElementById("drink-results");
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, no recipes found with this ingredient!"; // TODO: bigger font size and red
        results.appendChild(errorMessage);
    })

function showRecipes(data) {
    for (var i = 0; i < data.length; i++) {
        var results = document.getElementById("drink-results");
        var result = document.createElement("button");
        result.textContent = data[i].strDrink;
        results.appendChild(result);

        result.addEventListener("click", function (event) {
            var recipeName = event.target.innerText;
            console.log(recipeName);

            var API_RecipeURL = "https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v1/1/search.php?s=" + recipeName;
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
                    for (var i = 1; i <= 15; i++) {
                        var ingredientKey = `strIngredient${i}`;
                        var measurementKey = `strMeasure${i}`;
                        console.log(data.drinks[0][ingredientKey]);
                        if (data.drinks[0][ingredientKey] && data.drinks[0][ingredientKey].trim() !== "") {
                            if (data.drinks[0][measurementKey] && data.drinks[0][measurementKey].trim() !== "") {
                                ingredientsArray.push({ ingredient: data.drinks[0][ingredientKey], measurement: data.drinks[0][measurementKey] })
                            }
                        }
                    }
                    var recipeCardEl = document.getElementById("recipeCard");
                    recipeCardEl.innerHTML = "";
                    var drinkTitleEl = document.createElement("ul");
                    recipeCardEl.appendChild(drinkTitleEl);
                    drinkTitleEl.textContent = data.drinks[0].strDrink;
                    for (var i = 0; i < ingredientsArray.length; i++) {
                        var ingredientEl = document.createElement("li")
                        ingredientEl.textContent = ingredientsArray[i].measurement + " " + ingredientsArray[i].ingredient;
                        recipeCardEl.appendChild(ingredientEl);
                    }
                    var instructionsTitle = document.createElement("p");
                    instructionsTitle.textContent = "Instructions";
                    recipeCardEl.appendChild(instructionsTitle);
                    instructionsTitle.textContent = data.drinks[0].strInstructions;
                })
        })
    }
}