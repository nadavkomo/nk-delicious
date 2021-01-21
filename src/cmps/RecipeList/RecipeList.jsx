import { RecipePreview } from '../RecipePreview/RecipePreview';
import './RecipeList.scss'
export function RecipeList({ recipes, onSelectRecipe }) {
  console.log(recipes);
  return recipes.length ? (
    <ul className="recipe-list clean-list flex wrap auto-center ">
      {
        recipes.map(recipe => <RecipePreview onSelectRecipe={onSelectRecipe} recipe={recipe} key={recipe._id} />)
      }
    </ul>
  ) : <div className="recipe-list-default">There is no recipes</div>
}