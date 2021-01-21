import React from 'react'
import './RecipePreview.scss'
export function RecipePreview({ recipe, onSelectRecipe }) {

  function selectRecipe(ev) {
    ev.stopPropagation()
    onSelectRecipe(recipe._id)
  }
  return recipe && (
    <li className="recipe-preview flex column align-center hover-pointer" onClick={selectRecipe}>
      <div className="recipe-img-container">
        <img src={recipe.imgUrl} alt="" />
      </div>
      <div className="contant flex column">
        <div className="title-container">
          <h3>{recipe.title}</h3>
        </div>
        Author:<h3>{recipe.author.name}</h3>
      </div>
    </li>
  )
}
