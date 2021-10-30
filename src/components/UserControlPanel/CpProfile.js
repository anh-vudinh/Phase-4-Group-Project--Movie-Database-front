import React, {useState} from "react";
import X from "../../assets/X.png"
import eyeballIcon from "../../assets/eyeballicon.png"
import eyeballClosedIcon from "../../assets/eyeballClosedicon.png"
import BlankAvatar from "../../assets/blankAvatar.png"

function CpProfile({BASE_URL_BACK, selectedUser, setSelectedUser, setToggleCpUserProfile}) {

    const formDataDefault = {
        useremail: "",
        password: "",
        avatar_path: null,
        session_duration: selectedUser.session_duration,
        account_active: selectedUser.account_active
    }

    const [formData, setFormData] = useState(formDataDefault)

    const [showPassword, setShowPassword] = useState(false)

    function handleOnChange(e){
        if(e.target.name === "account_active") {
            return setFormData({...formData, [e.target.name]: e.target.checked})
        }
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleFormSubmit(e){
        e.preventDefault()
        const dataToSend = {
            useremail: formData.useremail === ""? selectedUser.useremail : formData.useremail,
            password: formData.password,
            avatar_path: formData.avatar_path === null? selectedUser.avatar_path : formData.avatar_path,
            session_duration: formData.session_duration,
            account_active: formData.account_active
        }
        sendToDB(dataToSend,`/users/${selectedUser.id}`)
    }

    function handleFormClose(){
        setToggleCpUserProfile(false)
        setFormData(formDataDefault)
    }

    function sendToDB(dataToSend, fetchURL){
        const headers = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }

        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            setSelectedUser({...selectedUser, ...data})
            setFormData({...formData, ...data})
            setToggleCpUserProfile(false)
        })
    }

    return (
        <div className="CpProfileUnderlay">
            <div className="CpProfileContainer">
                <div className="CpProfileNameContainer">
                    <p>{selectedUser.username}</p>
                </div>
                <div className="CpProfileImageContainer">
                    <img className="CpProfileImage" src={formData.avatar_path === null? selectedUser.avatar_path === null? BlankAvatar : selectedUser.avatar_path : formData.avatar_path} alt="profile"/>
                </div>
                <form className="CpProfileForm" onSubmit={handleFormSubmit}>
                    <div className="CpProfileFormSecA">
                        <input type="url" value={formData.avatar_path} name="avatar_path" placeholder={selectedUser.avatar_path === null ? "Image URL" : selectedUser.avatar_path} onChange={handleOnChange}/>            
                    </div>
                    <div className="CpProfileFormSecA">
                        <label>New Password</label>
                        <input type={showPassword? "text" : "password"} value={formData.password} name="password" onChange={handleOnChange}/>            
                    </div>
                    <div className="CpProfileFormSecA">
                        <label>Email</label>
                        <input type="email" value={formData.useremail} name="useremail" placeholder={selectedUser.useremail} onChange={handleOnChange}/>            
                    </div>
                    <div className="CpProfileFormSecB">
                        <label>Set Login Duration (max: 30 days)</label>
                        <input type="number" min="0" max="30" value={formData.session_duration} name="session_duration" onChange={handleOnChange}/>            
                    </div>
                    <div className="CpProfileFormSubmitContainer">
                        <input type="submit"/>
                    </div>
                    <div className="CpProfileFormSecC">
                        <label>Account Active</label>
                        <input type="checkbox" checked={formData.account_active} name="account_active" onChange={handleOnChange}/>            
                    </div>
                </form>
                <img className="usLogXIcon" src={X} alt="xicon" onClick={handleFormClose}/>
                <img className="CpShowPassword" src={showPassword? eyeballIcon : eyeballClosedIcon} alt="eyeball" onClick={()=> setShowPassword(!showPassword)}/>
            </div>
        </div>
    )
    
}


export default CpProfile;