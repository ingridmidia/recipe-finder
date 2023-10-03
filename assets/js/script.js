var foodSearch = document.getElementById("foodSearch");

// var foodSearch = document.getElementById("foodSearch"); // Assuming foodSearch is the form ID

foodSearch.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    var userInputFood = document.getElementById("userInputFood").value;

    var url = "./search-results.html?q=" + userInputFood;
    location.assign(url);
  });