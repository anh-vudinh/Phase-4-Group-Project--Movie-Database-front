import React, {useState, useEffect} from "react";
import loginBG from "../assets/loginBG.png"
import X from "../assets/X.png"
import eyeballIcon from "../assets/eyeballicon.png"
import eyeballClosedIcon from "../assets/eyeballClosedicon.png"

function Login({toggleLoginContainer, cookies, BASE_URL_BACK, setToggleLoginContainer, setSessionUsername, setIsLoggedIn}){
    
    const resetFormData = {username:"", password:""}
    const [formData, setFormData] = useState({username:"", password:""})
    const [errorMessage,setErrorMessage] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [toggleRegister, setToggleRegister] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (cookies.get('session') === undefined) return;                // if there is no cookie named session, prevent execution of following code on pageLoad
        const token = cookies.get('session')                             // takes token from session cookie and sends to backend to auto log in user
        sendUserDataToDB({token: token}, '/sessions/token_login')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function handleOnLoginSubmit(e){
        e.preventDefault()
        if(toggleRegister){
            if(formData.password === confirmPassword){                          // register action matching password and confirm
                sendUserDataToDB(formData, `/users`)
            }else{                                                              // register action mis-match password and confirm
                setErrorMessage("Error: Mismatch Passwords")
                setShowErrorMessage(true)
                setConfirmPassword("")                                          //reset password fields
            }
        }else{
            sendUserDataToDB(formData, `/sessions/login`)                       // default action for login
        }
    }

    function sendUserDataToDB(dataToSend, fetchURL){
        setShowErrorMessage(false)                                              // resets the errorMessage to false so that the fade in effect works again if user makes a different error
        
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        
        fetch(`${BASE_URL_BACK}${fetchURL}`, headers)
        .then(resp => resp.json())
        .then(message => {
            if(message.errors === undefined){
                cookies.set('session', message.token, { path: '/', maxAge: 2592000, domain:'localhost'})
                handleSuccessLogin(message)
            }else{
                handleFailLogin(message)
            }
        })
    }

    function handleSuccessLogin(message){
        setSessionUsername(message.username)
        setErrorMessage("")
        setShowErrorMessage(false)
        setToggleLoginContainer(false)
        setFormData(resetFormData)
        setConfirmPassword("")
        setIsLoggedIn(true)
    }

    function handleFailLogin(message){
        switch (message.errors) {
            case "user_exist": 
                setErrorMessage("Error: User Already Exist")
                setShowErrorMessage(true)
                break;
            case "wrong_pwd": 
                setErrorMessage("Wrong Password")
                setShowErrorMessage(true)
                break;
            case "no_user":
                setErrorMessage("User doesn't exist")
                setShowErrorMessage(true)
                cookies.remove('session')
                break;
            default:
                console.log("uncaught error")
        }
    }
    
    function handleOnChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleToggle(){
        setToggleRegister(!toggleRegister)
        setConfirmPassword("")
    }

    return(
        <div className={toggleLoginContainer? "loginUnderlay fade-in" : "loginUnderlay"}>
            <div className={toggleLoginContainer? "userLoginContainer fade-in" : "userLoginContainer"}>
                <div className="usEmptySpace"></div>
                <button className="loginRegisterButton" onClick={handleToggle}>{toggleRegister ? "Login?" : "Register?"}</button>
                <div className={showErrorMessage? "errorMessage fade-in" : "errorMessage"}><p>{errorMessage}</p></div>
                <form className="userRegisterForm" onSubmit={handleOnLoginSubmit}>
                    <div className="userLogIn">
                        <label>Username: </label>
                        <input type="text" name="username" value={formData.username} onChange={handleOnChange}/>
                    </div>
                    <div className="userPW">
                        <label>Password:</label>
                        <input type={showPassword? "text" : "password"} name="password" autoComplete="off" value={formData.password} onChange={handleOnChange}/>
                    </div>
                        <div className={toggleRegister?"userCFPW fade-in" : "userCFPW hidden"}>
                            <label>Confirm Password: </label> 
                            <input type="password" name="confirm_password" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> 
                        </div>
                    <div> 
                        <input className="usLogRegSubmit" value={toggleRegister ? "Register" : "Log In"} type="submit"/>
                    </div>
                </form>
                <img className="userLoginBG" src={loginBG} alt="backgroundImg"/>
                <img className="usLogXIcon" src={X} alt="xicon" onClick={()=> setToggleLoginContainer(false)}/>
                <img className="showPassword" src={showPassword? eyeballIcon : eyeballClosedIcon} alt="eyeball" onClick={()=> setShowPassword(!showPassword)}/>
            </div>
        </div>
    )
}

export default Login