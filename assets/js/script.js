
document.getElementById("submitBtn").addEventListener("click", function () {

    // Get the recipe the user typed in
    var recipe = document.querySelector("#recipeName").value;
    console.log(recipe);

    // Search for the recipe using the recipe-puppy api
    fetch("https://recipe-puppy.p.rapidapi.com/?q=" + recipe, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
            "x-rapidapi-key": "9ce51bbfeamsh6ee4d89a931f3b7p116f4bjsn94071dc14327"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
    
        // Get how many recipes the user would like to see
        var numChoice = document.getElementById("mySelect").value;
    
        for(var i=0; i<= (numChoice-1); i++) {
            console.log(response.results[i].ingredients);
        }
        // create header for name of recipe
        // create list for ingredients
        // maybe a pic

    })
    .catch(err => {
        console.log(err);
    });

    fetch("https://meal-hero.p.rapidapi.com/api/annotations/foods/"+ recipe + "/substitutions", {
        "method": "GET",
        "headers": {
                "x-rapidapi-host": "meal-hero.p.rapidapi.com",
                "x-rapidapi-key": "9ce51bbfeamsh6ee4d89a931f3b7p116f4bjsn94071dc14327"
        }
        })
        .then(response => {
            
            return response.json();
        })
        .then(response => {
            
            for(var i = 0; i <response.food_substitutions.length; i++) {
                console.log(response.food_substitutions[i].substitute.entity);
            }
        })
        .catch(err => {
            console.log(err);
        });

});

document.getElementById("cancelBtn").addEventListener("click", function () {
    console.log("I was clicked!");
});

/* Features to discuss
- do we need the cancel button
- do we want the recipes to append to the page or go to another page?
- do we want the ingredients in the recipes to be clickable or do we want a 
separate search field for substitutions
*/