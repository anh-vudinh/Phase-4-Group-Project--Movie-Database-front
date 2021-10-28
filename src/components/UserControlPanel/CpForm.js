import React from "react";

function CpForm({BASE_URL_BACK, isFilteredView, usersArray, setUsersArray, filteredUsersArray, setFilteredUsersArray, watchlistsArray, setWatchlistsArray, selectedUser, setToggleCpForm, formData, setFormData, formType, setFormType}) {
    
    function handleFormSubmit(e){
        e.preventDefault()
        switch (formType[0]){
            case 'User':
                handleUserAdd()
                break;
            case 'WL':
                handleWLAdd()
                break;
            default:
                console.log("uncaught case")
        }
    }

    function handleUserAdd(){
        sendToDB(formData,'/users')
    }

    function handleWLAdd(){
        const dataToSend = {user_id: selectedUser.id, wlname: formData.wlname}
        sendToDB(dataToSend,'/watchlists')
    }

    function handleOnChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function sendToDB(dataToSend,fetchURL){
        const headers = {
            method: "POST",
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
                    setWatchlistsArray([...watchlistsArray, data])
                    break;
                default:
                    console.log("uncaught case")
            }

            setFormType(["",""])
            setFormData({username:"", password:"", useremail:"", wlname:""})
            setToggleCpForm(false)
        })
    }

    return(
        <div className="CpFormContainer">
            <form onSubmit={handleFormSubmit}>
                {formType[0] === "User"?
                    <>
                        {formType[1] === "add"?
                            <div>
                                <label>Username</label>
                                <input type="text" value={formData.username} name="username" onChange={handleOnChange}/>            
                            </div>
                        : null
                        }
                        <div>
                            <label>User email</label>
                            <input type="email" value={formData.useremail} name="useremail" onChange={handleOnChange}/>            
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" value={formData.password} name="password" onChange={handleOnChange}/>            
                        </div>
                    </>
                : null
                }

                {formType[0] === "WL"?
                    <div>
                        <label>Watchlist Name</label>
                        <input type="text" value={formData.wlname} name="wlname" onChange={handleOnChange}/>            
                    </div>
                : null
                }

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default CpForm;