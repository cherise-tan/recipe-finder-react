import request from 'superagent'

const recipeUrl = 'https://www.themealdb.com/api/json/v1/1/'

export function randomRecipe() {
    return request.get(recipeUrl + 'random.php')
    .then(response => getRecipe(response.body.meals[0]))
}

function getRecipe(recipe) {

    var finalRecipe = {
        id: recipe.idMeal,
        title: recipe.strMeal,
        category: recipe.strCategory,
        area: recipe.strArea,
        image: recipe.strMealThumb,
        source: recipe.strSource
    }

    finalRecipe["instructions"] = recipe.strInstructions.split(/[\r\n]+/gm);

    finalRecipe["ingredientArray"] = [];

    for (let i = 1; i < 21; i++) {
        let ingredient = "strIngredient" + i;
        if (recipe[ingredient] === "") {} else {
            finalRecipe.ingredientArray.push(recipe[ingredient]);
        }
    }

    finalRecipe["measureArray"] = [];

    for (let i = 1; i < 21; i++) {
        let measure = "strMeasure" + i;
        if (recipe[measure] === "") {
            break;
        } else {
            finalRecipe.measureArray.push(recipe[measure]);
        }
    }

    return finalRecipe;
}