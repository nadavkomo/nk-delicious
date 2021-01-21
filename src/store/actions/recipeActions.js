import recipeService from '../../services/recipeService'

// Action Dispatcher
export function loadRecipes(filterBy) {
    return async dispatch => {
        const recipes = await recipeService.query(filterBy)
        console.log(recipes);
        dispatch({ type: 'SET_RECIPES', recipes })
    }
}

export function getById(recipeId) {
    return async dispatch => {
        const recipe = await recipeService.getById(recipeId)
        dispatch({ type: 'SET_RECIPE', recipe })
    }
}
export function removeRecipe(recipeId) {
    return async dispatch => {
        try {
            await recipeService.remove(recipeId)
            dispatch({ type: 'REMOVE_RECIPE', recipeId })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}


export function addRecipe(recipe) {
    return async dispatch => {
        try {
            const savedRecipe = await recipeService.save(recipe)
            console.log('savedRecipe', savedRecipe);
            dispatch({ type: 'ADD_RECIPE', recipe: savedRecipe })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}
export function updateRecipe(recipe) {
    return async dispatch => {
        try {
            const savedRecipe = await recipeService.save(recipe)
            dispatch({ type: 'UPDATE_RECIPE', recipe: savedRecipe })
        } catch (err) {
            console.log('ERROR!');
        }
    }
}