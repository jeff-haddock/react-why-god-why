import './App.css';
import React from "react";
import DrinksList from './DrinksList';

export default class App extends React.Component {
  constructor( ) {
    super();
    this.state = {
      drinks: [],
      favorites: []
    }

    this.favoritesHandler = this.favoritesHandler.bind(this)
    this.swapDrink = this.swapDrink.bind(this);
  }

  swapDrink(moveTo, moveFrom, drinkId){
    
    let drinkIndex = moveFrom.findIndex(item => {
      if(item.iddrink === drinkId){
        console.log(item)
      }
      return item.iddrink === drinkId
    })
    console.log(drinkIndex)
    let drink = moveFrom.splice(drinkIndex, 1)[0]
    console.log(drink)
    drink.isFavorite = !drink.isFavorite;
    moveTo.push(drink);
    let result = {
      moveTo, 
      moveFrom
    }
    return result;
  }

  favoritesHandler(drinkId, favoriteState){
    
    console.log("The REAL REAL - ", drinkId, favoriteState)
    if (favoriteState) {
      let { moveTo, moveFrom } = this.swapDrink([...this.state.drinks], [...this.state.favorites], drinkId)  
      this.setState({ favorites: moveFrom, drinks: moveTo })
      console.log("from favs", moveTo, moveFrom);
      
    } else {
      
      let { moveTo, moveFrom } = this.swapDrink([...this.state.favorites], [...this.state.drinks], drinkId)  
      this.setState({ favorites: moveTo.map(l => Object.assign({}, l)), drinks: moveFrom.map(l => Object.assign({}, l)) })
      console.log("from drinks", moveTo, moveFrom);
    }
  }

  componentDidMount(){
    console.log("cdm")
    fetch(`http://localhost:3001/`)
      .then(obj => obj.json())
      .then(obj => {
        
        let drinkData = obj.drinks.map(drink => {
            let result =  {
              strDrink: drink.strDrink,
              strDrinkThumb: drink.strDrinkThumb,
              isFavorite: false, 
              iddrink: drink.idDrink
            }
            
            return result
        })
        
        this.setState({
            drinks: [...drinkData]
        })
      })
  }
  
  
  render(){
      return (
        <div>
          <h1>Favorites</h1>
            <DrinksList drinkList={this.state.favorites} favoritesHandler={this.favoritesHandler}/>
          <p>*-----------------------------------------------*</p>
          <h1>Drinks</h1>
            <DrinksList drinkList={this.state.drinks} favoritesHandler={this.favoritesHandler}/>
        </div>
      );
    
  }
}

