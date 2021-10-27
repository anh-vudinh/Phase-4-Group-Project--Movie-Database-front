import React, {useState} from "react";
import CpMovies from"./CpMovies";
import CpSearch from "./CpSearch";
import CpUsers from "./CpUsers";
import CpWatchList from "./CpWatchList";



function ControlPanelContaioner({BASE_URL_BACK}) {
    const [selectedUser, setSelectedUser] = useState("")
    const [selectedWL, setSelectedWL] = useState("")
    const [selectedMoviesArray, setSelectedMoviesArray] = useState([])
    return (
        <div className="ControlPanelContainer" >
           <CpUsers 
                BASE_URL_BACK={BASE_URL_BACK} 
                selectedUser={selectedUser} 
                setSelectedUser={setSelectedUser}/>
           <CpWatchList 
                selectedUser={selectedUser} 
                BASE_URL_BACK={BASE_URL_BACK}  
                selectedWL={selectedWL} 
                setSelectedWL={setSelectedWL}/>
           <CpMovies
                selectedMoviesArray={selectedMoviesArray}
                setSelectedMoviesArray={setSelectedMoviesArray}
                selectedWL={selectedWL} 
                BASE_URL_BACK={BASE_URL_BACK}  
           />
           <CpSearch/>
        </div>
    )

    
}


export default ControlPanelContaioner;