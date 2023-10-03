//add event listeners: grab user input
    //main ingredient Food
    //main ingredient alcohol

//api call: use user input to make api call
  //Filter by main ingredient-food
//www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
        //clckable picture from main ingrediets to 
 //Filter by main ingredient-alcohol Search by ingredient
//www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

var userInputFood = "banana"
var userInputDrink = "gin"

var API_FoodURL = "https://cors-anywhere.herokuapp.com/" + "www.themealdb.com/api/json/v1/1/filter.php?i=" + userInputFood;
 console.log(API_FoodURL);

 fetch(API_FoodURL)
.then(function (response){ 
    return response.json();
    })
.then(function (data){
    console.log(data);
})
for (var i = 0; i < data.length; i++) {
    console.log(data[0].strMeal, data[0].idMeal);
    
}
var API_DrinkURL = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userInputDrink;