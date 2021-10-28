import React from "react";

function CpForm({BASE_URL_BACK,formData, setFormData}) {
    
    function handleFormSubmit(e){
        e.preventDefault()
        handleUserAdd()
    }

    function handleUserAdd(){
       
        sendToDB(formData,'/users')
    }

       
    function sendToDB(dataToSend,fetchURL){
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => console.log(data))

    }

    function handleOnChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={formData.username} name="username" onChange={handleOnChange}/>            
            </div>
            <div>
                <label>User email</label>
                <input type="text" value={formData.useremail} name="useremail" onChange={handleOnChange}/>            
            </div>
            <div>
                <label>Password</label>
                <input type="text" value={formData.password} name="password" onChange={handleOnChange}/>            
            </div>
            <div>
                <label>Watchlist Name</label>
                <input type="text" value={formData.wlname} name="wlname" onChange={handleOnChange}/>            
            </div>
            <div>
                <input type="submit"/>
            </div>
        </form>
    )
}

export default CpForm;