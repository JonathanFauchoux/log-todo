import React, {Component} from 'react';
import ListItems from './components/ListItems'
import {db, fire} from './fire'
import 'firebase/firestore' 
import './todo.css';

export default class Todo extends Component{
  constructor(props){
    super()
    this.state = {
      
      items:[],
      
      currentItem:{
        text:'',
        key: '',
        pseudo: ''
      }
    }
  }

//recupérer la value input et setState({})
  handleInput = (ev) =>{
    this.setState({
      currentItem :{
        text : ev.target.value,
        key: Date.now(),
        pseudo: JSON.parse(localStorage.getItem('pseudo'))
      }
    })
    ev.target.value = ''
    
  }

  //add
  addItem = (ev) =>{
    ev.preventDefault()
    
    const newItem = this.state.currentItem
   // console.log(newItem.text)
    if(newItem.text !== ''){
      const newItems = [...this.state.items, newItem]
      this.setState({
        items : newItems,
        currentItem : {
          text:'',
          key:'',
          pseudo: JSON.parse(localStorage.getItem('pseudo'))
        }
        
      })  
      this.state.items = newItems
     
      console.log(this.state.currentItem.text)
      db.collection('todos').doc(this.state.currentItem.text).set({
        
        text : this.state.currentItem.text,
        key: this.state.currentItem.key,
        pseudo: JSON.parse(localStorage.getItem('pseudo'))
      })
    }
   this.saveStateToLocalStorage()
  }

  //delete
  deleteItem =(key,ev)=>{
    db.collection('todos').doc(key).delete()
    
    //console.log(ev.target.parentElement.getAttribute('data-id'))
    const filteredItems = this.state.items.filter(item => item.key!==key)
    this.setState({
      items : filteredItems
    })
    this.saveStateToLocalStorage()
    this.reload(ev)
   }

   //editer
   setUpdate =(text, key)=>{
    const items = this.state.items
    console.log(text)
    /* const dataRef = db.collection("todos").doc(text);
    return dataRef.update({
      text: this.text
    })
    .then(function() {
        console.log("Document successfully updated!");
    }) */

    items.forEach((item) => {
      if(item.key===key){
        item.text = text
      }
    })
    this.setState({
      items : items
    })
    this.saveStateToLocalStorage()
}

   //setLocalStorage
   saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
    
  }
  
  reload(e){
    //console.log(e)
    const state = db.collection('todos')
     if (state) {
      state
      .get()
      .then(querySnapshot => {
        this.setState({
          items : querySnapshot.docs.map(doc => doc.data()),
         
          currentItem : {
            text:'',
            key:'',
            pseudo: JSON.parse(localStorage.getItem('pseudo'))
          }
        })
       // console.log(this.state.items)
      
      })
    /*   .then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    }); */
  
      
    } 
  }
  componentDidMount() {
    this.reload() 
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <form className="todoBoard" onSubmit={this.addItem}>

            <input type="text" 
            placeholder="New todo here ..." 
            value={this.state.currentItem.text} 
            onChange={this.handleInput}
            />

            <button className="addBtn" type="submit">Add</button>
          </form>
          
        </header>
        <ListItems 
          data={this.state.items} 
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}


