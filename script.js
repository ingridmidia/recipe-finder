//add event listeners: grab user input
//main ingredient Food
//main ingredient alcohol

//api call: use user input to make api call
//Filter by main ingredient-food
//www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
//clckable picture from main ingrediets to 
//Filter by main ingredient-alcohol Search by ingredient
//www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// var userInputDrink = "gin";
// var API_DrinkURL = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userInputDrink;

var userInputFood = "banana";

// click CORS URLto gain temp access to api 
var API_FoodURL = "https://cors-anywhere.herokuapp.com/" + "www.themealdb.com/api/json/v1/1/filter.php?i=" + userInputFood;
console.log(API_FoodURL);

fetch(API_FoodURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.meals.length < 5 || data.meals.length < 4) {
            for (var i = 0; i < 3; i++) { // error if i is less than 5
                console.log(data.meals[i].strMeal);
            }
        } else {
            for (var i = 0; i < 5; i++) {
                console.log(data.meals[i].strMeal);
                var results = document.getElementById("results");
                var result = document.createElement("li");
                result.textContent = data.meals[i].strMeal;
                results.appendChild(result);
            }
        }
    })
