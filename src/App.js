import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';

import {db, fire} from './fire'
import 'firebase/firestore'
import './App.css';
import Login from './Login'
import Hero from './Hero'
import Todo from './Todo'

const App = () => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  //console.log(user)


  let pseudo =""

  const handleUser = (ev) =>{
    
    pseudo = ev.target.value
    userPseudoToLocalStorage()
  }


  const userPseudoToLocalStorage = () => {
    localStorage.setItem('pseudo', JSON.stringify(pseudo))
  }
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () =>{
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = () =>{
    clearErrors()
    
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {

        switch(error.code){
          case "auth/invalid-email":
          case "auth/user-disable":
          case "auth/user-not-found":
            setEmailError(error.message)
            break
          case "auth/wrong-password" :
            setPasswordError(error.message)
            break 
            
        }
      })
    
  }

  const handleSignup = () =>{
    clearErrors()
    db.collection('users')
      .add({
        pseudo : pseudo,
        email : email,
        password : password,
        create_at: new Date()
      })
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password,)
      .catch(error => {
        switch(error.code){
          case "auth/email-already-use":
          case "auth/invalid-email":
            setEmailError(error.message)
            break
          case "auth/weak-password" :
            setPasswordError(error.message)
            break 
        }
      })
    
  }

const handleLogout =()=>{
  fire.auth().signOut()
}

const authlistener = () =>{
  fire.auth().onAuthStateChanged(user =>{
    if(user){
      clearInputs()
     setUser(user)
    }else{
      setUser('')
    }
  })
}

useEffect(()=>{
  authlistener()
})

  return (
    <div className="App">
      {user ? (
        <div className="main">
          <Hero handleLogout={handleLogout} pseudo={pseudo}/>
          <Todo />
        </div>
        
      ):(
        <Login 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        pseudo={pseudo}
        handleUser={handleUser}
        
      />
     
      )}
      
     
    </div>
  );
}

export default App;
