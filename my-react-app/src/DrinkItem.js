import React from "react"

export default class DrinkItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key: props.iddrink,
            iddrink: props.iddrink,
            strDrink: props.strDrink,
            strDrinkthumb: props.strDrinkThumb,
            isFavorite: props.isFavorite,
            favoriteDrinksHandler: props.favoriteDrinksHandler
        }
        this.toggleFavoriteBool = this.toggleFavoriteBool.bind(this)
    }
    toggleFavoriteBool(){
        let favePlaceholder = this.state.isFavorite
        this.setState({isFavorite: !this.state.isFavorite})
        this.state.favoriteDrinksHandler(this.state.iddrink, favePlaceholder)
    }
    render(){
        return (
            <li key={this.state.key}>
                <img src={this.state.strDrinkthumb} alt={this.state.strDrink} height='50' width='50' />
                <span iddrink={this.state.iddrink} strDrink={this.state.strDrink}>{this.state.strDrink}</span>
                <button iddrink={this.state.iddrink} onClick={this.toggleFavoriteBool}>fav</button>
            </li>
        )
    }
}
