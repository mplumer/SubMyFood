function initializePage() {
    var getRecipe = localStorage.getItem("Recipe");

    if (getRecipe != null) {
        var history = JSON.parse(getRecipe);

        for (var i = 0; i < history.length; i++) {
            var searchedRecipe = history[i];
            console.log(searchedRecipe);
            addRecipeItem(searchedRecipe);
        }
    }
}
initializePage();

function loadCard(parameter) {
    var recipeContainer = document.querySelector(".recipe-container");
    //recipeContainer.innerHTML = "";

    var recipeLink = parameter.href;
    var anchorLink = document.createElement("a");
    var anchorP = document.createElement("p");
    anchorLink.setAttribute("href", recipeLink);
    anchorLink.innerHTML = recipeLink;

    anchorP.appendChild(anchorLink);
    var subBtn = document.createElement("button");
    subBtn.innerHTML = "Substitute";
    subBtn.setAttribute("ingredients", parameter.ingredients);
    subBtn.setAttribute("recipe_name", parameter.title);
    var saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.setAttribute("ingredients", parameter.ingredients);
    saveBtn.setAttribute("recipe_name", parameter.title);

    saveBtn.addEventListener("click", function () {
        saveRecipe(parameter);
    });

    // create card div to hold recipe info
    var recipeCard = document.createElement("div");
    recipeCard.classList.add("box");
    var articleDiv = document.createElement("article");
    articleDiv.classList.add("media");
    var figureDiv = document.createElement("figure");
    figureDiv.classList.add("image");

    // create header for name of recipe
    // and create list for ingredients
    var recipeName = parameter.title;
    var ingredients = parameter.ingredients;
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
    content.appendChild(anchorP);
    mediaContent.appendChild(content);

    // create dropdown for substitutions
    subBtn.addEventListener("click", function (event) {

        var ingredients = event.target.getAttribute("ingredients");
        var list = ingredients.split(", ");

        var selectIng = document.createElement("select");
        for (let i = 0; i < list.length; i++) {
            var optionIng = document.createElement("option");
            optionIng.textContent = list[i];
            optionIng.value = list[i];
            selectIng.appendChild(optionIng);
        }

        selectIng.addEventListener("change", function (event) {
            getSub(event.target.value);
        })
        event.target.parentElement.appendChild(selectIng);
    });

    // create and append pic of recipe
    var recipeImg = document.createElement("img");
    var imgContainer = document.createElement("div");
    imgContainer.classList.add("media-left");
    recipeImg.src = parameter.thumbnail;
    figureDiv.appendChild(recipeImg);
    imgContainer.appendChild(figureDiv);

    articleDiv.appendChild(mediaContent);
    articleDiv.appendChild(imgContainer);

    recipeCard.appendChild(articleDiv);
    recipeCard.appendChild(subBtn);
    recipeCard.appendChild(saveBtn);
    recipeContainer.appendChild(recipeCard);
}

document.getElementById("submitBtn").addEventListener("click", function () {

    // Get the recipe the user typed in
    var recipe = document.querySelector("#recipeName").value;

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

            // Get how many recipes the user would like to see
            var numChoice = document.getElementById("mySelect").value;
            var recipeContainer = document.querySelector(".recipe-container");
            recipeContainer.innerHTML = "";

            for (let i = 0; i <= (numChoice - 1); i++) {
                loadCard(response.results[i]);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

function getSub(ingredient) {

    fetch("https://meal-hero.p.rapidapi.com/api/annotations/foods/" + ingredient + "/substitutions", {
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

            var modal = document.createElement("div");
            modal.classList.add("modal");
            modal.classList.add("is-active");

            var subContainer = document.createElement("div");
            subContainer.classList.add("modal-card");

            var subBackground = document.createElement("div");
            subBackground.classList.add("modal-background");

            var subExit = document.createElement("button");
            subExit.classList.add("modal-close");

            subExit.addEventListener("click", function () {
                modal.classList.remove("is-active");
            })

            var modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            modal.appendChild(subBackground);
            modal.appendChild(subContainer);
            modal.appendChild(subExit);
            modal.appendChild(modalContent);
            var recipeContainer = document.querySelector(".recipe-container");
            recipeContainer.appendChild(modal);


            for (let i = 0; i < response.food_substitutions.length; i++) {

                var subIngredients = response.food_substitutions[i].substitute.entity;
                var subIngredientsList = document.createElement("ul");
                var subIngredientsListItem = document.createElement("li");
                subIngredientsListItem.innerHTML = subIngredients;
                subIngredientsList.appendChild(subIngredientsListItem);

                modalContent.appendChild(subIngredientsList);
            }

        })
        .catch(err => {
            console.log(err);
        });
};

function saveRecipe(recipe) {

    var getRecipe = localStorage.getItem("Recipe");
    var recipeArray = [];

    // if getCity is empty, make new array of city
    if (getRecipe == null) {
        recipeArray.unshift(recipe);
    } else {
        recipeArray = JSON.parse(getRecipe);
        recipeArray.push(recipe);
    }

    // if it's not empty
    var recipestring = JSON.stringify(recipeArray);

    localStorage.setItem("Recipe", recipestring);

    addRecipeItem(recipe);
};

function addRecipeItem(recipe) {
    var dropdownTitle = document.querySelector(".dropdown-item");
    var dropdownItem = document.createElement("a");
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.innerHTML = recipe.title;
    dropdownTitle.appendChild(dropdownItem);
};

document.querySelector(".dropdown-item").addEventListener("click", function (event) {

    var getRecipe = localStorage.getItem("Recipe");

    if (getRecipe != null) {
        var history = JSON.parse(getRecipe);

        for (var i = 0; i < history.length; i++) {
            var searchedRecipe = history[i];
            console.log(searchedRecipe.title);
            if (searchedRecipe.title == event.target.textContent) {
                loadCard(searchedRecipe)
            }
        }
    }
});