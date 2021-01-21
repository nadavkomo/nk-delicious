
import React, { Component } from 'react'
import { connect } from 'react-redux';
import recipeService from '../../services/recipeService'
import { addRecipe, updateRecipe, removeRecipe } from '../../store/actions/recipeActions';
import './RecipeEdit.scss'
import back from '../../assets/icons/back.png'
import remove from '../../assets/icons/delete.png'
import save from '../../assets/icons/save.png'
import MultipleSelect from '../../cmps/element-ui/MultiSelect'
import { InputList } from '../../cmps/InputList/InputList'

class _RecipeEdit extends Component {
    elInput = React.createRef();
    state = {
        recipe: {
            title: '',
            description: ''
        },
        errMsg: '',
        tagsList: [
            'Low Calorie',
            'Browning',
            'Dinner',
            'Quick',
            'Lunch',
            'Desert',
            'Vegetarian'
        ]

    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.recipe) {
            this.setState({ recipe: nextProps.recipe })
        }
    }


    async componentDidMount() {
        const { id } = this.props.match.params
        const recipe = id ? await recipeService.getById(id) : await recipeService.getEmptyRecipe()
        if (recipe) this.setState({ recipe })
        else this.setState({ errMsg: 'Recipe Not Found!' })
        console.log(recipe);
        this.elInput.current.focus()
    }
    handleChange = async ({ target }) => {
        console.log('change', target.name);
        if (target.name === 'author') {
            const value = target.value
            await this.setState(prevState => ({ recipe: { ...prevState.recipe, [target.name]: { name: value } } }))
            console.log(this.state.recipe);
        } else {
            const field = target.name
            const value = target.type === 'number' ? +target.value : target.value
            await this.setState(prevState => ({ recipe: { ...prevState.recipe, [field]: value } }))
            console.log(this.state.recipe);
        }
    }
    onSaveRecipe = async (ev) => {
        ev.preventDefault()
        const { recipe } = this.state
        if (recipe.title === '' || recipe.description === '') {
            this.setState({ errMsg: 'Please fill all the above filled' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 2500)
            return
        }
        if (recipe._id) await this.props.updateRecipe(recipe)
        else await this.props.addRecipe(recipe)
        this.props.history.push('/recipe')
        // this.props.history.goBack()
    }
    onRemoveRecipe = async () => {
        await this.props.removeRecipe(this.state.recipe._id)
        this.props.history.push('/recipe')
    }



    render() {
        const { title, description, tags, imgUrl, ingredients, time, servings, calories, author } = this.state.recipe
        const { tagsList } = this.state
        return this.state.recipe && (
            <section className="recipe-edit flex column align-center ">
                <section className="btns flex space-between">
                    <button className="btn back-btn" onClick={() => this.props.history.goBack()}><img src={back} alt="" /></button>
                    {this.state.recipe._id && <button className="btn" onClick={this.onRemoveRecipe}><img src={remove} alt="" /></button>}
                </section>
                <form className="flex column auto-center" onSubmit={this.onSaveRecipe}>
                    <label>Title</label>
                    <input autoFocus type="text" ref={this.elInput} name="title" value={title} onChange={this.handleChange} />
                    <label>Description</label>
                    <textarea rows="5" cols="40" type="text" name="description" value={description} onChange={this.handleChange} ></textarea>
                    <label>Time (seconds)</label>
                    <input type="number" name="time" value={time} onChange={this.handleChange} />
                    <label>Calories</label>
                    <input type="number" name="calories" value={calories} onChange={this.handleChange} />
                    <label>Number of servings</label>
                    <input type="number" name="servings" value={servings} onChange={this.handleChange} />
                    <label>Author name</label>
                    <input type="text" name="author" value={author ? author.name : ' '} onChange={this.handleChange} />
                    {/* <label className="text-center">Tags <br /> (if there are some tags separate each one only with "," For example: Easy,Dinner </label>
                    <input type="text" name="tags" value={tags} onChange={this.handleChange} /> */}
                    {tags && <label>Tags:<br /></label>}
                    {tags && <ul className="clean-list text-center">
                        {tags.map(tag => <li>{tag}</li>)}
                    </ul>}
                    <MultipleSelect currValues={tags} values={tagsList} change={this.handleChange} />
                    <InputList id={this.props.match.params.id} values={ingredients} change={this.handleChange} />
                    <label>Picture</label>
                    <input type="img" name="imgUrl" value={imgUrl} onChange={this.handleChange} />
                    <img className="recipe-img" src={imgUrl} />
                    <button className="btn save-btn"><img src={save} /></button>
                    <span className="err-msg">{this.state.errMsg}</span>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = {
    addRecipe,
    updateRecipe,
    removeRecipe
}
export const RecipeEdit = connect(null, mapDispatchToProps)(_RecipeEdit)
