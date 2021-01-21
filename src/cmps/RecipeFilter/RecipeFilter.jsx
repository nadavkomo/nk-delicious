import { useForm } from '../../services/customHooks'
import './RecipeFilter.scss'
import search from '../../assets/icons/search.png'

export function RecipeFilter(props) {
    const [filterBy, setFilterBy] = useForm({ term: '' }, props.onSetFilter)
    const { term } = filterBy
    return <form className="recipe-filter">
        <form className="flex" onSubmit={setFilterBy}>
            <input name="term" placeholder="Free Search" value={term} type="text" onChange={setFilterBy} />
            <img onClick={setFilterBy} src={search} alt=""  />
            {/* <img onClick={searchRecipes} src="https://banner2.cleanpng.com/20180421/upe/kisspng-magnifying-glass-computer-icons-magnification-white-lense-5adb69dd8142a5.9454649915243289255295.jpg" alt="" /> */}
        </form>
    </form>
}