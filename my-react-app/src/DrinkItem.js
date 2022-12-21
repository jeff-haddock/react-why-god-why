import React from "react"

export default class DrinkItem extends React.Component{
    constructor( props ) {
        super();
        
        this.state = {
            id: props.drink.iddrink,
            strDrink: props.drink.strDrink,
            strDrinkthumb: props.drink.strDrinkThumb,
            isFavorite: props.drink.isFavorite,
        }
        this.favoritesHandler = props.favoritesHandler;

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(drink){
        this.favoritesHandler(drink.id, drink.isFavorite)
    }

    render(){
        return (
            <div>
                <img src={this.state.strDrinkthumb} alt={this.state.strDrink} height='100' width='100' />
                <br/>
                <span >{this.state.strDrink}</span>
                <button onClick={() => { this.handleClick(this.state) }}>fav</button>
            </div>
        )
    }
}
