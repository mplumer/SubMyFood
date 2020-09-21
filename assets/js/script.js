
document.getElementById("submitBtn").addEventListener("click", function () {

    // Get the recipe the user typed in
    var recipe = document.querySelector("#recipeName").value;
    console.log(recipe);
    // Save the recipe in local storage

    // Save the recipe under Saved Recipes tab

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
        console.log(response);
        // Get how many recipes the user would like to see
        var numChoice = document.getElementById("mySelect").value;
        var recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.innerHTML = "";

        for(var i=0; i<= (numChoice-1); i++) {
            
            var recipeCard = document.createElement("div");
            recipeCard.classList.add("box");
            var articleDiv = document.createElement("article");
            articleDiv.classList.add("media");
            var figureDiv = document.createElement("figure");
            figureDiv.classList.add("image");

            // create header for name of recipe
            // and create list for ingredients
            var recipeName = response.results[i].title;
            var ingredients = response.results[i].ingredients;
            var recipeTitle = document.createElement("h2");
            var recipeIngs = document.createElement("p");

            recipeIngs.innerHTML = ingredients;
            recipeTitle.innerHTML = recipeName;

            var mediaContent = document.createElement("div");
            mediaContent.classList.add("media-content");
            mediaContent.classList.add("media-right");
            var content = document.createElement("div");
            content.classList.add("content");

            content.appendChild(recipeTitle);
            content.appendChild(recipeIngs);
            mediaContent.appendChild(content);

            // create and append pic of recipe
            var recipeImg = document.createElement("img");
            var imgContainer = document.createElement("div");
            imgContainer.classList.add("media-left");
            recipeImg.src = response.results[i].thumbnail;
            figureDiv.appendChild(recipeImg);
            imgContainer.appendChild(figureDiv);
            articleDiv.appendChild(mediaContent);
            articleDiv.appendChild(imgContainer);

            recipeCard.appendChild(articleDiv);
            
        
            recipeContainer.appendChild(recipeCard);
        }
        

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
separate search field for substitutions?
*/