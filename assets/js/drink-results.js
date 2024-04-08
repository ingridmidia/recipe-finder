var alcohol = document.location.search.split("=")[1];
var API_DrinkURL =
  "https://thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;

fetch(API_DrinkURL)
  .then(function (response) {
    if (!response.ok) {
      // validates input
      throw response.json();
    }
    return response.json();
  })
  .then(function (data) {
    if (data.drinks.length < 5) {
      data = data.drinks;
      showRecipes(data);
    } else {
      data = data.drinks.slice(0, 5);
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
    var results = document.getElementById("drink-results");
    results.classList.add(
      "is-flex",
      "is-flex-wrap-wrap",
      "is-justify-content-center"
    );
    var result = document.createElement("button");
    result.classList.add("is-dark", "button", "is-rounded", "mr-2", "mt-4");
    result.textContent = data[i].strDrink;
    results.appendChild(result);

    result.addEventListener("click", function (event) {
      var recipeName = event.target.innerText;

      var API_RecipeURL =
        "https://thecocktaildb.com/api/json/v1/1/search.php?s=" + recipeName;

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
          for (var i = 1; i <= 15; i++) {
            var ingredientKey = `strIngredient${i}`;
            var measurementKey = `strMeasure${i}`;
            if (
              data.drinks[0][ingredientKey] &&
              data.drinks[0][ingredientKey].trim() !== ""
            ) {
              if (
                data.drinks[0][measurementKey] &&
                data.drinks[0][measurementKey].trim() !== ""
              ) {
                ingredientsArray.push({
                  ingredient: data.drinks[0][ingredientKey],
                  measurement: data.drinks[0][measurementKey],
                });
              }
            }
          }

          var recipeCardEl = document.getElementById("recipeCard");
          recipeCardEl.innerHTML = "";

          var drinkTitleEl = document.createElement("ul");
          drinkTitleEl.classList.add(
            "has-text-weight-bold",
            "pt-6",
            "title",
            "is-2"
          );
          recipeCardEl.appendChild(drinkTitleEl);
          drinkTitleEl.textContent = data.drinks[0].strDrink;

          var image = document.createElement("img");
          image.src = data.drinks[0].strDrinkThumb;
          image.alt = data.drinks[0].strDrink;
          image.classList.add("p-4");
          recipeCardEl.appendChild(image);

          if (ingredientsArray.length > 0) {
            var ingredientsTitle = document.createElement("h3");
            ingredientsTitle.textContent = "Ingredients";
            ingredientsTitle.classList.add("pb-4");
            recipeCardEl.appendChild(ingredientsTitle);

            for (var i = 0; i < ingredientsArray.length; i++) {
              var ingredientEl = document.createElement("li");
              ingredientEl.textContent =
                ingredientsArray[i].measurement +
                " " +
                ingredientsArray[i].ingredient;
              recipeCardEl.appendChild(ingredientEl);
            }
          }

          var instructionsTitle = document.createElement("h3");
          instructionsTitle.textContent = "Instructions";
          instructionsTitle.classList.add("pb-4", "pt-4");
          recipeCardEl.appendChild(instructionsTitle);

          var instructionsContent = document.createElement("p");
          instructionsContent.classList.add("p-4");
          instructionsContent.textContent = data.drinks[0].strInstructions;
          recipeCardEl.appendChild(instructionsContent);
        });
    });
  }
}
