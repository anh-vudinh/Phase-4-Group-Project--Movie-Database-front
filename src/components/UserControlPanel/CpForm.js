import React, {useState} from "react";
import X from "../../assets/X.png"

function CpForm({BASE_URL_BACK, isFilteredView, selectedWL, usersArray, setUsersArray, filteredUsersArray, setFilteredUsersArray, watchlistsArray, setWatchlistsArray, selectedUser, setToggleCpForm, formType, setFormType}) {
    
    const defaultFormData = {
        username: "",
        password:"",
        useremail:"",
        wlname: "",
        is_default: false
    }
    const [formData, setFormData] = useState(defaultFormData)

    function handleFormSubmit(e){
        e.preventDefault()
        switch (formType[0]){
            case 'User':
                handleUserAdd()
                break;
            case 'WL':
                if (formType[1] === "add"){
                    handleWLAdd()
                }else if(formType[1] === "update"){
                    handleWLUpdate()
                }
                break;
            default:
                console.log("uncaught case")
        }
    }

    function handleUserAdd(){
        sendToDB(formData,'/users','POST')
    }

    function handleWLAdd(){
        const dataToSend = {
            user_id: selectedUser.id, 
            wlname: formData.wlname
        }
        sendToDB(dataToSend,'/watchlists','POST')
    }

    function handleWLUpdate(){

        const dataToSend = {
            user_id: selectedUser.id, 
            wlname: formData.wlname === ""? selectedWL.wlname : formData.wlname,
            is_default: formData.is_default
        }
        sendToDB(dataToSend,`/watchlists/${selectedWL.id}`,'PATCH')
    }

    function handleOnChange(e){
        if(e.target.name === "is_default"){
            return setFormData({...formData, [e.target.name]:e.target.checked})
        }
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleFormClose(){
        setToggleCpForm(false)
        setFormData(defaultFormData)
    }

    function sendToDB(dataToSend, fetchURL, method){
        const headers = {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            switch (formType[0]){
                case 'User':
                    if (isFilteredView){
                        setFilteredUsersArray([...filteredUsersArray, data])
                    }
                    setUsersArray([...usersArray, data])
                    break;
                case 'WL':
                    if (formType[1] === "add") {
                        setWatchlistsArray([...watchlistsArray, data])
                    } else if (formType[1] === "update") {
                        setWatchlistsArray(data)
                    }
                    break;
                default:
                    console.log("uncaught case")
            }
            setFormType(["",""])
            setFormData(defaultFormData)
            setToggleCpForm(false)
        })
    }

    return(
        <div className="CpFormUnderlay">
            <div className="CpFormContainer">
                <div className="CpFormTitle"><p>{`${formType[1].charAt(0).toUpperCase()}${formType[1].slice(1)} ${formType[0]}`}</p></div>
                <form className="CpForm" onSubmit={handleFormSubmit}>
                    {formType[0] === "User"?
                        <>
                            {formType[1] === "add"?
                                <div className="CpFormSecA">
                                    <label>Username</label>
                                    <input type="text" value={formData.username} name="username" onChange={handleOnChange}/>            
                                </div>
                            : null
                            }
                            <div className="CpFormSecA">
                                <label>Email</label>
                                <input type="email" value={formData.useremail} name="useremail" onChange={handleOnChange}/>            
                            </div>
                            <div className="CpFormSecA">
                                <label>Password</label>
                                <input type="password" value={formData.password} name="password" onChange={handleOnChange}/>            
                            </div>
                        </>
                    : null
                    }

                    {formType[0] === "WL"?
                        <>
                            <div className="CpFormSecA">
                                <label>Watchlist Name</label>
                                <input type="text" value={formData.wlname} placeholder={selectedWL.wlname} name="wlname" onChange={handleOnChange}/>            
                            </div>
                            {formType[1] === "update"?
                                <div className="CpFormSecA">
                                    {selectedWL.is_default?
                                        <p className="cpDefaultWLText">*Default Watchlist</p>
                                    :
                                    <>
                                        <label>Set default</label>
                                        <input type="checkbox" value={formData.is_default} name="is_default" onChange={handleOnChange}/> 
                                    </>
                                    }
                                </div>
                            : null
                            }
                        </>
                    : null
                    }

                    <div class="CpFormSubmitContainer">
                        <input type="submit"/>
                    </div>
                </form>
                <img className="CpFormLogXIcon" src={X} alt="xicon" onClick={handleFormClose}/>
            </div>
        </div>
        
    )
}

export default CpForm;