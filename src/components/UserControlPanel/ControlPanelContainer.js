import React, {useState, useEffect} from "react";
import CpMovies from"./CpMovies";
import CpSearch from "./CpSearch";
import CpUsers from "./CpUsers";
import CpWatchList from "./CpWatchList";
import CpForm from "./CpForm";
import CpProfile from "./CpProfile";

function ControlPanelContaioner({BASE_URL_BACK}) {

     const [selectedUser, setSelectedUser] = useState("")
     const [selectedWL, setSelectedWL] = useState("")
     const [selectedMoviesArray, setSelectedMoviesArray] = useState([])
     const poster_prefixURL = "https://www.themoviedb.org/t/p/w100_and_h100_face"
     const defaultFormData = {
          username:"",
          password:"",
          useremail:"",
          wlname:"",
          is_default:false
     }
     const [formData, setFormData] = useState(defaultFormData)
     const [toggleCpForm, setToggleCpForm] = useState(false)
     const [isFilteredView, setIsFilteredView] = useState(false)
     const [toggleCpUserProfile, setToggleCpUserProfile] = useState(false)
     const [formType, setFormType] = useState(["",""])
     const [usersArray, setUsersArray] = useState([])
     const [filteredUsersArray, setFilteredUsersArray] = useState([])
     const [filteredSearchArray,setFilteredSearchArray] = useState([])
     const [watchlistsArray, setWatchlistsArray] = useState([])
     const [moviesArray, setMoviesArray] = useState([])

     useEffect(()=>{
          setToggleCpForm(false)
          // eslint-disable-next-line react-hooks/exhaustive-deps
     },[selectedUser,selectedWL])

     return (
          <div className="ControlPanelUnderlay">
               <div className="ControlPanelContainer" >
                    <CpUsers 
                         BASE_URL_BACK={BASE_URL_BACK} 
                         selectedUser={selectedUser} 
                         setSelectedUser={setSelectedUser}
                         setToggleCpForm ={setToggleCpForm}
                         formType={formType} setFormType={setFormType}
                         usersArray={usersArray} setUsersArray={setUsersArray}
                         setMoviesArray={setMoviesArray}
                         setWatchlistsArray={setWatchlistsArray}
                         filteredUsersArray={filteredUsersArray} setFilteredUsersArray={setFilteredUsersArray}
                         isFilteredView={isFilteredView} setIsFilteredView={setIsFilteredView}
                         toggleCpUserProfile={toggleCpUserProfile} setToggleCpUserProfile={setToggleCpUserProfile}
                    />

                    <CpWatchList 
                         selectedUser={selectedUser} 
                         BASE_URL_BACK={BASE_URL_BACK}  
                         selectedWL={selectedWL} 
                         setSelectedWL={setSelectedWL}
                         setToggleCpForm ={setToggleCpForm}
                         formType={formType} setFormType={setFormType}
                         watchlistsArray={watchlistsArray} setWatchlistsArray={setWatchlistsArray}
                         setMoviesArray={setMoviesArray}
                    />

                    <CpMovies
                         selectedMoviesArray={selectedMoviesArray}
                         setSelectedMoviesArray={setSelectedMoviesArray}
                         selectedWL={selectedWL} 
                         BASE_URL_BACK={BASE_URL_BACK}
                         poster_prefixURL={poster_prefixURL}
                         moviesArray={moviesArray} setMoviesArray={setMoviesArray}
                    />

                    <CpSearch
                         filteredSearchArray={filteredSearchArray} setFilteredSearchArray={setFilteredSearchArray}
                    />
                    
                    {toggleCpForm?
                         <CpForm
                              formData={formData}
                              setFormData={setFormData}
                              BASE_URL_BACK={BASE_URL_BACK}
                              formType={formType} setFormType={setFormType}
                              setToggleCpForm={setToggleCpForm}
                              selectedUser={selectedUser}
                              usersArray={usersArray} setUsersArray={setUsersArray}
                              filteredUsersArray={filteredUsersArray} setFilteredUsersArray={setFilteredUsersArray}
                              watchlistsArray={watchlistsArray} setWatchlistsArray={setWatchlistsArray}
                              isFilteredView={isFilteredView}
                              defaultFormData={defaultFormData}
                              selectedWL={selectedWL}
                         />
                         :
                         null
                    }

                    {toggleCpUserProfile?
                         <CpProfile
                              selectedUser={selectedUser} setSelectedUser={setSelectedUser}
                              setToggleCpUserProfile={setToggleCpUserProfile}
                              BASE_URL_BACK={BASE_URL_BACK}
                         />
                    : null
                    }
               </div>
          </div>
     )
    
}


export default ControlPanelContaioner;