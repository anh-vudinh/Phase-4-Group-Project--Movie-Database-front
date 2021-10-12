import React from "react";
import { NavLink } from "react-router-dom"
import blankAvatar from "../assets/blankAvatar.png"

function NavBar({setToggleLoginContainer, sessionUsername, setSessionUsername, setSessionToken}){

    function handleNavLoginClick(){
        setToggleLoginContainer(true)
    }

    function handleNavProfileClick(){

    }

    function handleNavLogoutClick(){
        setSessionUsername("")
        setSessionToken("")
    }

    return(
        <div className="navBar">
            <h1>Movie Scope</h1> 
            <nav className="navLinks">
                <NavLink exact to="/">Movies</NavLink>
                <NavLink to="/tvShows">Tv Shows</NavLink>
            </nav>
            {sessionUsername === ""?
                <button className="navLogin" onClick={handleNavLoginClick}>Login</button>
            :
                <div className="navLogContainer">
                    <div className="navLogText">
                        <div className="navUsernameContainer">
                            <p className="navUsernameText">{sessionUsername}</p>
                        </div>
                        <div className="navLogoutContainer">
                            <p className="navLogoutText" onClick={handleNavLogoutClick}>Logout?</p>    
                        </div>
                    </div>
                    <div className="navProfileIcon" onClick={handleNavProfileClick}>
                        <img src={blankAvatar} alt="blankAvatar"/>
                    </div>
                </div>
            }
                
        </div>
    )
}

export default NavBar