import React from "react";
import { NavLink } from "react-router-dom"
import blankAvatar from "../assets/blankAvatar.png"

function NavBar({setToggleLoginContainer, sessionProfilePic, setSessionProfilePic, sessionUsername, isLoggedIn, cookies, setIsLoggedIn, setSessionUsername, setOnLogOut}){

    function handleNavLoginClick(){
        setToggleLoginContainer(true)
    }

    function handleNavProfileClick(){

    }

    function handleNavLogoutClick(){
        setSessionUsername("")
        setSessionProfilePic(null)
        cookies.remove('session')
        setOnLogOut(0)
        setIsLoggedIn(false)
    }

    return(
        <div className="navBarContainer">
            <div className="navBar">
                <h1>Movie Scope</h1> 
                <nav className="navLinks">
                    <NavLink exact to="/">Movies</NavLink>
                    <NavLink to="/tvShows">Tv Shows</NavLink>
                    {isLoggedIn? <NavLink to="/controlPanel">Control Panel</NavLink> : null}
                </nav>
                {isLoggedIn?
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
                            <img src={sessionProfilePic === null? blankAvatar : sessionProfilePic} alt="profilepic"/>
                        </div>
                    </div>
                    :
                    <button className="navLogin" onClick={handleNavLoginClick}>Login</button>
                }
            </div>
        </div>
    )
}

export default NavBar