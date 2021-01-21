import { storageService } from "./storageService.js";
import HttpService from './HttpService.js'
export default {
    query,
    getById,
    remove,
    save,
    getEmptyRecipe
}


const recipes = storageService.load('RECIPES') ? storageService.load('RECIPES') : [
    {
        "_id": "5a56640269f443a5d64b32ca",
        "title": "Tomato Soup & Grilled Cheese Sandwich",
        "description": "A piping hot bowl of your favorite tomato soup served with a grilled cheese sandwich, golden brown and oozing with cheese - now that's a dinner combination that just can't be beat!",
        "Ingredients": [
            "2 cans Campbell’s® Condensed Tomato Soup",
            "0.63 liters water",
            "8 teaspoons butter (softened)",
            "8 slices Pepperidge Farm® White Calcium Enriched Sliced Sandwich Bread",
            "8 slices American cheese"
        ],
        "time": 10,
        "calories": 370,
        "servings": 4,
        "tags": [
            "Lunch",
            "Quick",
            "Low Calorie"
        ],
        "author": {
            "name": "Alice Rajasombat"
        },
        "imgUrl": "https: //lh3.googleusercontent.com/mlS0KdAClX1Kc5ZvNcZLABKyZFZq8jTS4xaZUlM7Z8GhwnrpmPTo54xWoYmlL_eumyIvdrC7RwZZx1YSzpys_A=s640-c-rw-v1-e365"
    },
    {
        "_id": "5a56640269f443a5da8932ca",
        "title": "Quick Creamy Chicken & Noodles",
        "description": "Cream of chicken and mushroom soups combine with chicken, noodles and Parmesan cheese to make a delicious, family-friendly dinner in just 25 minutes.",
        "Ingredients": [
            "298 grams Campbell’s® Condensed Cream of Chicken and Mushroom Soup",
            "118 milliliters milk",
            "1/8 teaspoon ground black pepper",
            "33 grams grated Parmesan cheese",
            "473 milliliters boneless, skinless chicken breasts (cubed, cooked)",
            "114 grams egg noodles (cooked, about 3 cups dry)",
            "1 tablespoon fresh parsley (chopped)"
        ],
        "time": 25,
        "calories": 230,
        "servings": 4,
        "tags": [
            "Dinner",
            "Quick"
        ],
        "author": {
            "name": "Stephanie Manley"
        },
        "imgUrl": "https://lh3.googleusercontent.com/RCKX-9ox0mBX17JhFUkwXIdMMKv7CDn0A7mygZOOFKCMAbqyFbUh3ufV-ldYiIUKVrCIOF4ljxfTE7fbaYmVyg=s640-c-rw-v1-e365"
    },
    {
        "_id": "5a56640269f443a5da8276ca",
        "title": "Spicy Mac & Beef",
        "description": "This souped up version of the all-time favorite macaroni and cheese includes ground beef and spicy sauce. Best of all, it's on the table in just 35 minutes.",
        "Ingredients": [
            "454 grams ground beef",
            "298 grams Campbell’s® Condensed Beef Broth",
            "315 milliliters water",
            "210 grams shell pasta (uncooked, medium shells)",
            "273 milliliters Campbell’s® Condensed Cheddar Cheese Soup",
            "256 grams Pace® Picante Sauce"
        ],
        "time": 35,
        "calories": 550,
        "servings": 4,
        "tags": [
            "Low Calorie",
            "Browning",
            "Dinner"
        ],
        "author": {
            "name": "Georgia Malik"
        },
        "imgUrl": "https://lh3.googleusercontent.com/6piVa3SwzQhIu3kK2etqoP_-RyR9TPTl4B74Z4fL69a3hIdfQet94KRPzYRewwT8MVnlOsx6XKkoSz0wD9oOIQ=s640-c-rw-v1-e365"
    }
];

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

async function query(filterBy = null) {
    // return new Promise((resolve, reject) => {
    //     if(storageService.load('RECIPES')) {
    //         var recipesToReturn = storageService.load('RECIPES');
    //     } else {
    //         recipesToReturn = recipes;
    //         storageService.store('RECIPES', recipes)
    //     }
    //     if (filterBy && filterBy.term) {
    //         recipesToReturn = filter(filterBy.term)
    //     }
    //     resolve(sort([...recipesToReturn]))
    // })
    var recipes = await HttpService.get('recipe')
    if (filterBy && filterBy.term) {
        recipes = filter(filterBy.term, recipes)
    }
    return Promise.resolve(recipes)
    // return HttpService.get('recipe')
}

function getById(id) {
    // return new Promise((resolve, reject) => {
    //     const recipe = recipes.find(recipe => recipe._id === id)
    //     recipe ? resolve(recipe) : reject(`Recipe id ${id} not found!`)
    // })
    return HttpService.get(`recipe/${id}`)
}

function remove(recipeId) {
    // return new Promise((resolve, reject) => {
    //     const index = recipes.findIndex(recipe => recipe._id === id)
    //     if (index !== -1) {
    //         recipes.splice(index, 1)
    //         storageService.store('RECIPES', recipes)
    //     }
    //     resolve(recipes)
    // })
    return HttpService.delete(`recipe/${recipeId}`)
}

function _updateRecipe(recipe) {
    // return new Promise((resolve, reject) => {
    //     const index = recipes.findIndex(c => recipe._id === c._id)
    //     if (index !== -1) {
    //         recipes[index] = recipe
    //         storageService.store('RECIPES', recipes)
    //     }
    //     resolve(recipe)
    // })
    recipe.updatedAt = Date.now()
    return HttpService.put(`recipe/${recipe._id}`, recipe)
}

function _addRecipe(recipe) {
    // return new Promise((resolve, reject) => {
    //     recipe._id = _makeId()
    //     recipes.push(recipe)
    //     storageService.store('RECIPES', recipes)
    //     resolve(recipe)
    // })
    recipe.createdAt = Date.now()
    return HttpService.post(`recipe`, recipe)

}

function save(recipe) {
    return recipe._id ? _updateRecipe(recipe) : _addRecipe(recipe)
}

function getEmptyRecipe() {
    return {
        title: '',
        description: '',
        ingredients: [],
        time: 0,
        calories: 0,
        servings: 0,
        tags: [],
        author: {name: ''},
        imgUrl: 'https://getquicktech.com.au/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'
    }
}

function filter(term, recipes) {
    term = term.toLocaleLowerCase()
    return recipes.filter(recipe => {
        return recipe.title.toLocaleLowerCase().includes(term) ||
            recipe.description.toLocaleLowerCase().includes(term)
    })
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}