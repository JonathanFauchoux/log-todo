import React from 'react'



const Hero = (props) =>{


    let pseudo = JSON.parse(localStorage.getItem('pseudo'))
    
  
  
  return(
    <section className="hero">
      <nav>
        <h2>Salut {pseudo} !</h2>
        <button onClick={props.handleLogout}>Logout</button>
      </nav>
    </section>
  )
}

export default Hero