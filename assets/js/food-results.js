var ingredient = document.location.search.split("=")[1];
var API_FoodURL =
  "https://themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

fetch(API_FoodURL)
  .then(function (response) {
    if (!response.ok) {
      // validates input
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
  });

function showRecipes(data) {
  for (var i = 0; i < data.length; i++) {
    var results = document.getElementById("food-results");
    results.classList.add(
      "is-flex",
      "is-flex-wrap-wrap",
      "is-justify-content-center"
    );
    var result = document.createElement("button");
    result.classList.add("is-dark", "button", "is-rounded", "mr-2", "mt-4");
    result.textContent = data[i].strMeal;
    results.appendChild(result);

    result.addEventListener("click", function (event) {
      var recipeName = event.target.innerText;

      var API_RecipeURL =
        "https://themealdb.com/api/json/v1/1/search.php?s=" + recipeName;

      fetch(API_RecipeURL)
        .then(function (response) {
          if (!response.ok) {
            // validates input
            throw response.json();
          }
          return response.json();
        })
        .then(function (data) {
          var ingredientsArray = [];
          for (var i = 1; i <= 20; i++) {
            var ingredientKey = `strIngredient${i}`;
            var measurementKey = `strMeasure${i}`;
            if (
              data.meals[0][ingredientKey] &&
              data.meals[0][ingredientKey].trim() !== ""
            ) {
              if (
                data.meals[0][measurementKey] &&
                data.meals[0][measurementKey].trim() !== ""
              ) {
                ingredientsArray.push({
                  ingredient: data.meals[0][ingredientKey],
                  measurement: data.meals[0][measurementKey],
                });
              }
            }
          }

          var recipeCardEl = document.getElementById("recipeCard");
          recipeCardEl.innerHTML = "";

          var mealTitleEl = document.createElement("h2");
          mealTitleEl.classList.add(
            "has-text-weight-bold",
            "pt-6",
            "title",
            "is-2"
          );
          mealTitleEl.textContent = data.meals[0].strMeal;
          recipeCardEl.appendChild(mealTitleEl);

          var image = document.createElement("img");
          image.src = data.meals[0].strMealThumb;
          image.alt = data.meals[0].strMeal;
          image.classList.add("p-4");
          recipeCardEl.appendChild(image);

          var ingredientsTitle = document.createElement("h3");
          ingredientsTitle.classList.add("p-4");
          ingredientsTitle.textContent = "Ingredients";
          recipeCardEl.appendChild(ingredientsTitle);

          var ingredientsList = document.createElement("ul");
          ingredientsList.classList.add("p-4");
          for (var i = 0; i < ingredientsArray.length; i++) {
            var ingredientEl = document.createElement("li");
            ingredientEl.textContent =
              ingredientsArray[i].measurement +
              " " +
              ingredientsArray[i].ingredient;
            ingredientsList.appendChild(ingredientEl);
          }
          recipeCardEl.appendChild(ingredientsList);

          var instructionsTitle = document.createElement("h3");
          instructionsTitle.textContent = "Instructions";
          instructionsTitle.classList.add("p-4");
          recipeCardEl.appendChild(instructionsTitle);

          var instructionsContent = document.createElement("p");
          instructionsContent.classList.add("p-4");
          instructionsContent.textContent = data.meals[0].strInstructions;
          recipeCardEl.appendChild(instructionsContent);
        });
    });
  }
}
