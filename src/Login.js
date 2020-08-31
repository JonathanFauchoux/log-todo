import React from 'react'

const Login = (props) => {
  //const [email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount,emailError, passwordError] = props

  return (
    <section className='login'>
      

      <div className="loginContainer">

      

        <label>Email</label>
        <input type="text" 
          autoFocus required 
          value={props.email} 
          onChange={(e) => props.setEmail(e.target.value)} />
        <p className="errorMsg">{props.emailError}</p>


        <label>Mot de passe</label>
        <input type="password" 
          required 
          value={props.password} 
          onChange={(e) => props.setPassword(e.target.value)} />
        <p className="errorMsg">{props.passwordError}</p>
        <div className='btnContainer'>
          {props.hasAccount ?(
            <>
              <button onClick={props.handleLogin}>Se connecter</button>
              <p>Créer un compte : <span onClick={()=> props.setHasAccount(!props.hasAccount)}>S'inscire</span></p>
            </>
          ):(
            <>
            <label>Pseudo</label>
            <input type="text" 
              autoFocus required  
            /*    value={props.pseudo}   */
              onChange={(e) => props.handleUser(e)}  />
            <p className="errorMsg"></p>
            <br></br>
            <br></br>
              <button onClick={props.handleSignup}>S'inscire</button>
              <p>Vous avez déjà un compte : <span onClick={()=> props.setHasAccount(!props.hasAccount)}>Se connecter</span></p>
            </>
          )}
        </div>


      </div>
  
    </section>
  )
}

export default Login