import React from 'react';
import logo from '../assets/logo.svg';
import './ListItems.css';
import FlipMove from 'react-flip-move'

export default function ListItems (props){

  const items = props.data
  let pseudo = props.pseudo

  
    return(
      <div className="container">

        <h1>Todo or not Todo..?</h1>
        <FlipMove className="liste" duration={500} easing="ease-in-out">
      
            {items.map(item => (
              <div className="items" key={item.key} data-id={item.key}>
                <input type="text" 
                  className="inputItems"
                  value={item.text} 
                  id={item.key} 
                  onChange={
                    (e) => props.setUpdate(e.target.value, item.key)
                  }
                  
                />
                <p className="pseudo">by {item.pseudo}</p>
                <div className="deleteBtn" onClick={(e) => props.deleteItem(item.text, e)}>
                  <img src={logo} className="App-logo" alt="logo" />
                </div>
              </div>
            ))}
       
        </FlipMove>
      </div>
    )
  
}


