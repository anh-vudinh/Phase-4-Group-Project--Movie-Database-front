import React from "react";
import { NavLink } from "react-router-dom"

function NavBar({setToggleLoginContainer}){

    return(
        <div className="navBar">
            <h1>Movie Scope</h1> 
            <nav className="navLinks">
                <NavLink exact to="/">Movies</NavLink>
                <NavLink to="/tvShows">Tv Shows</NavLink>
            </nav>
                <button className="navLogin" onClick={()=> setToggleLoginContainer(true)}>Login</button>
        </div>
    )
}

export default NavBar