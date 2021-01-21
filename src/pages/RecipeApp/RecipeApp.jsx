
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { RecipeFilter } from '../../cmps/RecipeFilter/RecipeFilter';
import { RecipeList } from '../../cmps/RecipeList/RecipeList';
import recipeService from '../../services/recipeService';
import { loadRecipes } from '../../store/actions/recipeActions';
import Select from 'react-select'
// import ReactSelect from '../../cmps/react-select'
import './RecipeApp.scss'
import plus from '../../assets/icons/plus.png'

export function RecipeApp(props) {
    const [filterBy, setFilterBy] = useState(null)
    var recipes = useSelector(state => state.recipeReducer.recipes)
    console.log(props.location.search);
    if (props.location.search) {
        var res = props.location.search.substring(1)
        var resArr = res.split('=')
        const field = resArr[0]
        const value = resArr[1]
        if (field === 'term') {
            const term = value.toLocaleLowerCase()
            recipes = recipes.filter(recipe => {
                return recipe.title.toLocaleLowerCase().includes(term) ||
                    recipe.description.toLocaleLowerCase().includes(term)
            })
        } else {
            recipes = recipes.filter(recipe => {
                console.log(recipe[field]);
                if (field === 'author') return recipe[field].name === value.replace('%20', ' ')
                return recipe[field].includes(value)
            })
        }
    }


    const dispatch = useDispatch()
    useEffect(() => {
        console.log('effect');
        dispatch(loadRecipes(filterBy))
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        setFilterBy(filterBy)
    }

    const onSelectRecipe = (selectedRecipeId) => {
        props.history.push(`/recipe/${selectedRecipeId}`)
    }

    const options = [
        { value: 'Quick', label: 'Quick' },
        { value: 'Vegetarian', label: 'Vegetarian' },
        { value: 'Dinner', label: 'Dinner' },
        { value: 'Show All', label: 'Show All' }
    ]

    return (
        <div className="recipe-app flex column align-center">
            <Link className="add-btn btn" to="/recipe/edit"><img src={plus} /></Link>
            <section className="filter text-center flex column auto-center">
                <h1>Recipes</h1>
                <RecipeFilter onSetFilter={onSetFilter} />
                <section className="nav-btns flex auto-center">
                    <button onClick={() => props.history.push(`/recipe?tags=Quick`)}>Quick</button>
                    <button onClick={() => props.history.push(`/recipe?tags=Vegetarian`)}>Vegeterian</button>
                    <button onClick={() => props.history.push(`/recipe?tags=Dinner`)}>Dinner</button>
                    <button onClick={() => props.history.push(`/recipe`)}>Show All</button>
                </section>
                <Select className="nav-btns-mobile" onChange={(ev) => {
                    if(ev.value === 'Show All') props.history.push(`/recipe`)
                    else props.history.push(`/recipe?tags=${ev.value}`)
                }} options={options} />
            </section>
            {recipes && <RecipeList onSelectRecipe={onSelectRecipe} recipes={recipes} />}
        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         recipes: state.recipeReducer.recipes
//         // If we want to filter the recipes first "like computed" but not really
//         // recipes: getRecipesForDisplay(state.recipeReducer.recipes)
//     }
// }
// const mapDispatchToProps = {
//     loadRecipes
// }
// export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)
