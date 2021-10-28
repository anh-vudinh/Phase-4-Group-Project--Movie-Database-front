import React, {useState} from "react";
import CpMovies from"./CpMovies";
import CpSearch from "./CpSearch";
import CpUsers from "./CpUsers";
import CpWatchList from "./CpWatchList";
import CpForm from "./CpForm";


function ControlPanelContaioner({BASE_URL_BACK}) {

    const [selectedUser, setSelectedUser] = useState("")
    const [selectedWL, setSelectedWL] = useState("")
    const [selectedMoviesArray, setSelectedMoviesArray] = useState([])
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w100_and_h100_face"
    const [formData, setFormData] = useState({username:"",password:"",useremail:"",wlname:""})
    const [toggleCpForm, setToggleCpForm] = useState(false)
    return (
        <div className="ControlPanelContainer" >

           <CpUsers 
                BASE_URL_BACK={BASE_URL_BACK} 
                selectedUser={selectedUser} 
                setSelectedUser={setSelectedUser}
                setToggleCpForm ={setToggleCpForm}
          />

           <CpWatchList 
                selectedUser={selectedUser} 
                BASE_URL_BACK={BASE_URL_BACK}  
                selectedWL={selectedWL} 
                setSelectedWL={setSelectedWL}
          />

           <CpMovies
                selectedMoviesArray={selectedMoviesArray}
                setSelectedMoviesArray={setSelectedMoviesArray}
                selectedWL={selectedWL} 
                BASE_URL_BACK={BASE_URL_BACK}
                poster_prefixURL={poster_prefixURL}
           />

           <CpSearch/>
            {toggleCpForm?
                 <CpForm
                    formData={formData}
                    setFormData={setFormData}
                    BASE_URL_BACK={BASE_URL_BACK} 
                />
                :
                null
             }
          

        </div>
    )

    
}


export default ControlPanelContaioner;