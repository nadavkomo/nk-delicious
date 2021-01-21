
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getById, updateRecipe } from '../../store/actions/recipeActions'
import { eventBus } from '../../services/eventBusService'
import recipeService from '../../services/recipeService'
import { storageService } from '../../services/storageService'
import './RecipeDetails.scss'
import back from '../../assets/icons/back.png'
import edit from '../../assets/icons/edit.png'
import { ChatApp } from '../../cmps/ChatApp/ChatApp'
import socketService from '../../services/socket-service.js'
import TextField from '@material-ui/core/TextField'
import Moment from 'react-moment';

class _RecipeDetails extends Component {
    state = {
        recipe: null,
        errMsg: '',
        review: { from: "", txt: "" },
    }
    async componentDidMount() {
        await this.loadRecipe()
    }
    // componentWillUnmount() {
    //     socketService.terminate()
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadRecipe()
        }
    }
    async loadRecipe() {
        await this.props.getById(this.props.match.params.id)
        console.log(this.props.recipe);
        // const recipe = await recipeService.getById(this.props.match.params.id)
        // this.setState({ recipe })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log(value);
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }))
    }

    addReview = async (ev) => {
        ev.preventDefault()
        var recipeToUpdate = { ...this.props.recipe }
        if (!recipeToUpdate.reviews) recipeToUpdate.reviews = []
        var review = { ...this.state.review }
        if (review.from === '') review.from = 'Guest'
        if (review.txt === '') {
            this.setState({ errMsg: 'Invalid review' })
            setTimeout(() => {
                this.setState({ errMsg: '' })
            }, 3000)
            return
        }
        review.createdAt = Date.now()
        recipeToUpdate.reviews.push({ ...review })
        this.setState({ recipe: { ...recipeToUpdate } })
        await this.props.updateRecipe(recipeToUpdate)
        await this.loadRecipe()
        this.setState({ review: { from: "", txt: "" } })
    }

    render() {
        const { recipe } = this.props
        const { errMsg, review } = this.state
        if (!recipe) return <div>Loading...</div>
        return <div className="recipe-details flex column align-center">
            <section className="btns flex justify-center">
                <button className="btn" onClick={(ev) => {
                    ev.stopPropagation()
                    this.props.history.goBack()
                }}><img src={back} alt="" /></button>
                <button className="btn" onClick={() => this.props.history.push('/recipe/edit/' + recipe._id)}><img src={edit} /></button>
            </section>
            <h1 className="title mb15 text-center">{recipe.title}</h1>
            <div className="contant flex align-center">
                <section className="left mr10 flex column align-center">
                    <h2>Description:</h2>
                    <p className="text-center mb15">{recipe.description}</p>
                    <h2>Ingredients:</h2>
                    <ul className="recipe-list ingredients ">
                        {
                            recipe.ingredients.map((ingredient, idx) => <li className="ingredient" key={idx}>{ingredient}</li>)
                        }
                    </ul>
                    <section className="extra-details flex">
                        <div className="summary-item-wrapper flex align-center">
                            <div className="recipe-summery-item flex column text-center">
                                <span>{recipe.ingredients.length}</span>
                                <span>Ingredients</span>
                            </div>
                            <div className="recipe-summery-item flex column text-center">
                                <span>{recipe.time}</span>
                                <span>Minutes</span>
                            </div>
                            <div className="recipe-summery-item flex column text-center">
                                <span>{recipe.calories}</span>
                                <span>Calories</span>
                            </div>
                            <div className="recipe-summery-item flex column text-center">
                                <span>{recipe.servings}</span>
                                <span>Servings</span>
                            </div>
                        </div>
                        <div className="tags-container flex column align-center">
                            <h2>Tags:</h2>
                            <ul className="clean-list mb15 tags flex auto-center wrap">
                                {
                                    recipe.tags.map((tag, idx) => <p className="tag" key={idx}>{tag}</p>)
                                }
                            </ul>
                        </div>
                    </section>
                </section>
                <section className="right flex column auto-center">
                    <img className="recipe-img mb15" src={recipe.imgUrl} alt="" />
                    <div className="chat-app-desktop">
                        <ChatApp recipeId={recipe._id}></ChatApp>
                    </div>
                </section>
            </div>
            <section className="funcs flex column align-center">
                <section className="reviews flex column auto-center">
                    <h2 className="mb15 text-center">Reviews:</h2>
                    <section className="reviews-container flex justify-center">
                        <div className="add-review">
                            <h4 className="mb15 text-center">Add Review</h4>
                            <form onSubmit={this.addReview} className="add-review-form flex column align-center">
                                <TextField className="input-from" label="Enter your name" type="text" name="from" value={review.from} onChange={this.handleChange} />
                                <TextField className="input-msg" id="outlined-multiline-static" variant="outlined" label="Enter your review" type="text" name="txt" value={review.txt} onChange={this.handleChange} />
                                <button className="btn" onClick={this.addReview}>Add review</button>
                            </form>
                            <p>{errMsg}</p>
                        </div>
                        {recipe.reviews && recipe.reviews.length > 0 ? <div className="review-list flex wrap mb15">
                            {recipe.reviews.map(({ from, txt, createdAt }, index) => (
                                <div className="review" key={index}>
                                    <h4>{from}: <span className="review-txt">{txt}</span></h4>
                                    <h5><Moment fromNow>{createdAt}</Moment></h5>
                                </div>
                            ))}
                        </div> : <div className="default-review-list flex auto-center"><h1>No reviews yet, be the first!</h1></div>}
                    </section>
                </section>
                <div className="chat-app-mobile">
                    <ChatApp recipeId={recipe._id}></ChatApp>
                </div>

            </section>
        </div >
    }
}

function mapStateToProps(state) {
    return {
        recipe: state.recipeReducer.currRecipe,

    }
}
const mapDispatchToProps = {
    getById,
    updateRecipe,

}
export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)

