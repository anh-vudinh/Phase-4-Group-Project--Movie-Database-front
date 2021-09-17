import React from "react";
import { NavLink } from "react-router-dom"
function NavBar(){
    return(

    <div className="navBar">
        <h1>Movie Scope</h1> 
            <nav className="navLinks">
                <NavLink exact to="/">Movies</NavLink>

                <NavLink to="/tvShows">Tv Shows</NavLink>
            
            </nav>     
        </div>
    )
}

export default NavBar