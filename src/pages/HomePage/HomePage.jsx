
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { RecipeList } from '../../cmps/RecipeList/RecipeList';
import { loadRecipes } from '../../store/actions/recipeActions';

import recipeService from '../../services/recipeService';
import './HomePage.scss'
import hero from '../../assets/imgs/hero.jpg'
import search from '../../assets/icons/search.png'
export function HomePage(props) {
    const [term, setTerm] = useState('')
    const recipes = useSelector(state => state.recipeReducer.recipes)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('effect');
        dispatch(loadRecipes())
    }, [])

    var recipesToShow = []
    recipesToShow = recipes.slice(0, 3)
    function recipesToShowByTag(tag) {
        return recipes.filter(recipe => recipe.tags.includes(tag)).splice(0, 3)
    }
    const onSelectRecipe = (selectedRecipeId) => {
        props.history.push(`/recipe/${selectedRecipeId}`)
    }
    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log(value);
        setTerm(value)
    }
    const searchRecipes = (ev) => {
        ev.preventDefault()
        props.history.push(`/recipe?term=${term}`)
    }
    return (
        <section className="home-page flex column align-center full">
            <div className="img-container mb15">
                <section className="contant flex column auto-center text-center">
                    <section className="hero-text flex column auto-center text-center mb15">
                        <h2>Welcome To Delecious</h2>
                        <h4>Let's create the right meal for you and those around you</h4>
                    </section>
                    <form className="flex" onSubmit={searchRecipes}>
                        <input type="text" placeholder="Find a recipe" name="term" value={term} onChange={handleChange} />
                        <img onClick={searchRecipes} src={search} alt=""  />
                    </form>
                    <section className="nav-btns flex wrap auto-center">
                        <button onClick={() => props.history.push(`/recipe?tags=Quick`)}>Quick</button>
                        <button onClick={() => props.history.push(`/recipe?tags=Vegetarian`)}>Vegeterian</button>
                        <button onClick={() => props.history.push(`/recipe?tags=Dinner`)}>Dinner</button>
                        <button onClick={() => props.history.push(`/recipe`)}>Show All</button>
                    </section>
                </section>
            </div>
            <section className="previews">
                <section className="nav-contant flex align-center space-between">
                    <h3>Dinner</h3>
                    <h3><Link to="/recipe">Show All</Link></h3>
                </section>
                <div className="contant flex column">
                    {recipesToShowByTag('Dinner') && <RecipeList onSelectRecipe={onSelectRecipe} recipes={recipesToShowByTag('Dinner')} />}
                </div>
            </section>
            <section className="previews">
                <section className="nav-contant flex align-center space-between">
                    <h3>Vegetarian</h3>
                    <h3><Link to="/recipe">Show All</Link></h3>
                </section>
                <div className="contant flex column">
                    {recipesToShowByTag('Vegetarian') && <RecipeList onSelectRecipe={onSelectRecipe} recipes={recipesToShowByTag('Vegetarian')} />}
                </div>
            </section>
        </section>
    )
}

