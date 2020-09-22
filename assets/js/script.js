//var subBtn = document.getElementById("subBtn");
document.getElementById("submitBtn").addEventListener("click", function () {

    // Get the recipe the user typed in
    var recipe = document.querySelector("#recipeName").value;
    console.log(recipe);
    // Save the recipe in local storage
    // Save the recipe under Saved Recipes tab
    // create buttons for cards
    

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
        //recipeContainer.classList.remove("is-invisible");

        for(let i=0; i<= (numChoice-1); i++) {
            
            var recipeLink = response.results[i].href;
            var anchorLink = document.createElement("a");
            anchorLink.setAttribute("href", recipeLink);
            anchorLink.innerHTML = "" + recipeLink;
            console.log(anchorLink);
            var subBtn = document.createElement("button");
            subBtn.innerHTML = "Substitute";
            subBtn.setAttribute("ingredients", response.results[i].ingredients);
            subBtn.setAttribute("recipe_name", response.results[i].title);
            var saveBtn = document.createElement("button");
            saveBtn.innerHTML = "Save";
            saveBtn.setAttribute("ingredients", response.results[i].ingredients);
            saveBtn.setAttribute("recipe_name", response.results[i].title);

            

            saveBtn.addEventListener("click", function(event) {
                console.log("I was too!");
                
                
            });


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
            recipeIngs.appendChild(anchorLink);
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
            // create dropdown for substitutions
            subBtn.addEventListener("click", function(event) {
                console.log("I was clicked!");
                var ingredients = event.target.getAttribute("ingredients");
                console.log(event.target.getAttribute("recipe_name"));
                console.log(ingredients);
                var list = ingredients.split(", ");
                console.log(list);

                var selectIng = document.createElement("select");
                for(let i=0; i < list.length; i++) {
                    var optionIng = document.createElement("option");
                    optionIng.textContent = list[i];
                    optionIng.value = list[i];

                    selectIng.appendChild(optionIng);
                }
                
                selectIng.addEventListener("change", function(event) {
                    getSub(event.target.value);
                })
                
                event.target.parentElement.appendChild(selectIng);
                
            });


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
            recipeCard.appendChild(subBtn);
            recipeCard.appendChild(saveBtn);
            recipeContainer.appendChild(recipeCard);
        }
    })
    .catch(err => {
        console.log(err);
    });

    
});

function getSub(ingredient) {
    console.log("I was called " + ingredient);
    fetch("https://meal-hero.p.rapidapi.com/api/annotations/foods/"+ ingredient + "/substitutions", {
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
            console.log(response);
            for(let i = 0; i <response.food_substitutions.length; i++) {
                console.log(response.food_substitutions[i].substitute.entity);
            }
        })
        .catch(err => {
            console.log(err);
        });
};