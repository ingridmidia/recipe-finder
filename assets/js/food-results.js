var ingredient = document.location.search.split("=")[1];
var API_FoodURL = "https://themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

fetch(API_FoodURL)
    .then(function (response) {
        if (!response.ok) {// validates input
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        if (data.meals.length < 5) {
            data = data.meals;
            showRecipes(data);
        } else {
            data = data.meals.slice(0, 5);
            showRecipes(data);
        }
    })
    .catch(function () {
        var results = document.getElementById("not-found");
         results.classList.remove("is-hidden");
        results.classList.add("is-visible");
    })

function showRecipes(data) {
    for (var i = 0; i < data.length; i++) {
        var results = document.getElementById("food-results");
        results.classList.add("is-flex", "is-flex-wrap-wrap", "is-justify-content-center");
        var result = document.createElement("button");
        result.classList.add("is-dark", "button", "is-rounded", "mr-2", "mt-4");
        result.textContent = data[i].strMeal;
        results.appendChild(result);

        result.addEventListener("click", function (event) {
            var recipeName = event.target.innerText;

            var API_RecipeURL = "https://themealdb.com/api/json/v1/1/search.php?s=" + recipeName;

            fetch(API_RecipeURL)
                .then(function (response) {
                    if (!response.ok) {// validates input
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (data) {
                    var ingredientsArray = [];
                    for (var i = 1; i <= 20; i++) {
                        var ingredientKey = `strIngredient${i}`;
                        var measurementKey = `strMeasure${i}`;
                        if (data.meals[0][ingredientKey] && data.meals[0][ingredientKey].trim() !== "") {
                            if (data.meals[0][measurementKey] && data.meals[0][measurementKey].trim() !== "") {
                                ingredientsArray.push({ ingredient: data.meals[0][ingredientKey], measurement: data.meals[0][measurementKey] })
                            }
                        }
                    }
                    var recipeCardEl = document.getElementById("recipeCard");
                    recipeCardEl.innerHTML = "";
                    var mealTitleEl = document.createElement("ul");
                    recipeCardEl.appendChild(mealTitleEl);
                    mealTitleEl.textContent = data.meals[0].strMeal;
                    for (var i = 0; i < ingredientsArray.length; i++) {
                        var ingredientEl = document.createElement("li");
                        ingredientEl.innerHTML = "";
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
}