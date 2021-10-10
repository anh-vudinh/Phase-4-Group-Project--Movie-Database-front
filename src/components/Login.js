import React, {useState} from "react";
import loginBG from "../assets/loginBG.png"
import X from "../assets/X.png"

function Login({toggleLoginContainer, setToggleLoginContainer}){
    
    const [formData, setFormData] = useState({username:"", password:""})
    const [errorMessage,setErrorMessage] = useState("")
    const [toggleRegister, setToggleRegister] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    function handleOnLoginSubmit(e){
        e.preventDefault()
        if(toggleRegister){
            
        }else{

        }
    }
    
    function handleOnChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleToggle(){
        setToggleRegister(!toggleRegister)
    }

    return(
        <div className={toggleLoginContainer? "loginUnderlay fade-in" : "loginUnderlay"}>
            <div className="userLoginContainer">
                <div className="usEmptySpace"></div>
                <button className="loginRegisterButton" onClick={handleToggle}>{toggleRegister ? "Login?" : "Register?"}</button>
                <form className="userSignUpForm" onSubmit={handleOnLoginSubmit}>
                    <div className="userLogIn">
                        <label>Username: </label>
                        <input type="text" name="username" value={formData.username} onChange={handleOnChange}/>
                    </div>
                    <div className="userPW">
                        <label>Password:</label>
                        <input type="password" name="password" autoComplete="off" value={formData.password} onChange={handleOnChange}/>
                    </div>
                        <div className={toggleRegister?"userCFPW fade-in" : "userCFPW hidden"}>
                            <label>Confirm Password: </label> 
                            <input type="password" name="confirm_password" autoComplete="off" onChange={(e) => setConfirmPassword(e.target.value)}/> 
                        </div>
                    <div> 
                        <input className="usLogRegSubmit" value={toggleRegister ? "Register" : "Log In"} type="submit"/>
                    </div>
                    <div className="errorMessage"><p>{errorMessage}</p></div>
                </form>
                <img className="userLoginBG" src={loginBG} alt="backgroundImg"/>
                <img className="usLogXIcon" src={X} alt="xicon" onClick={()=> setToggleLoginContainer(false)}/>
            </div>
        </div>
    )
}

export default Login