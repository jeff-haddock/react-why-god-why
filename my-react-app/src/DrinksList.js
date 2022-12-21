import React from "react";
import DrinkItem from './DrinkItem'

export default class DrinksList extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            drinkList: props.drinkList,
            favoritesHandler: props.favoritesHandler
        }
    }

    render(){
        console.log("lengths on render: ", this.state.drinkList)        
        return(
            <ul>
                {   
                    this.state.drinkList.map(drink => {
                        return  <DrinkItem 
                                    key={drink.iddrink} 
                                    drink={drink} 
                                    favoritesHandler={this.state.favoritesHandler}  
                                />
                    })
                }
            </ul>
        )
    }

}
