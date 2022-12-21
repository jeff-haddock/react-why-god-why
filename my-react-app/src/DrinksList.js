import React from "react";
import DrinkItem from './DrinkItem'

export default class DrinksList extends React.Component {
    constructor() {
        super();
        this.state = {
            drinksList: [],
            favoriteDrinks: []
        }
        this.favoriteDrinksHandler = this.favoriteDrinksHandler.bind(this)
    }
    favoriteDrinksHandler(iddrink, favoriteState){
        let drinkIndexToToggle;
        console.log('favorite state: ' + favoriteState)
        if (favoriteState === false) {
            drinkIndexToToggle = this.state.drinksList.findIndex(item => item.iddrink === iddrink)
        } else {
            drinkIndexToToggle = this.state.favoriteDrinks.findIndex(item => item.iddrink === iddrink);
        }
        // if it is not a favorite
        if (!this.state.drinksList[drinkIndexToToggle].isFavorite){
            let newFavorites = [...this.state.favoriteDrinks, this.state.drinksList[drinkIndexToToggle]];
            let newDrinksList = [...this.state.drinksList];
            newDrinksList.splice(drinkIndexToToggle, 1)
            this.setState({favoriteDrinks: newFavorites, drinksList: newDrinksList })
            // if it is a favorite
        } else {
            let newDrinksList = [...this.state.drinksList, this.state.favoriteDrinks[drinkIndexToToggle]];
            let newFavorites = [...this.state.favoriteDrinks];
            newFavorites.splice(drinkIndexToToggle, 1)
            this.setState({favoriteDrinks: newFavorites, drinksList: newDrinksList })
        }
        console.log(this.state.favoriteDrinks)
    }
    componentDidMount(){
        fetch(`http://localhost:3001/`)
            .then(obj => obj.json())
            .then(obj => {
                let drinkData = obj.drinks.map(drink => {
                    let result =  {...drink, isFavorite: false, iddrink: drink.idDrink}
                    delete result.idDrink;
                    return result
                })
                this.setState({
                    drinksList : [...drinkData]
                })
            })
    }

    render(){
        return(
            <>
                <h1>Favorites</h1>
                <ul>{this.state.favoriteDrinks.map(drink => {
                        return <DrinkItem key={drink.iddrink} iddrink={drink.iddrink} strDrink={drink.strDrink} strDrinkThumb={drink.strDrinkThumb} favoriteDrinksHandler={this.favoriteDrinksHandler} isFavorite={drink.isFavorite} />
                    })}</ul>
                <p>*-----------------------------------------------*</p>
                <h1>Drinks</h1>
                <ul>{this.state.drinksList.map(drink => {
                        return <DrinkItem key={drink.iddrink} iddrink={drink.iddrink} strDrink={drink.strDrink} strDrinkThumb={drink.strDrinkThumb} favoriteDrinksHandler={this.favoriteDrinksHandler} isFavorite={drink.isFavorite} />
                    })}</ul>
            </>
        )
    }

}
