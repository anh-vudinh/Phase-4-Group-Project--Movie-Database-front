import React, {useState} from "react";
import FilterCategory from './FilterCategory'

function Search({setmovieCateogry, apiKey, apiPrefixURL, setMoviesData, setYearOrGenreSuffix, setSearchSuffix, setTogglePage2, setPageNumber, setIsLoadMoreMovies, isLoadMoreMovies}){
    
    const categoryButtonArray = ["Popular","Top Rated", "Genres", "Year Release", "Upcoming"]
    const [genresArray, setGenresArray] = useState([]) //
    const [isExtendedOptions, setExtendedOptions] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [currentCategorySelected, setCurrentCategorySelected] = useState("") //

    const genresURL = `${apiPrefixURL}genre/movie/list?api_key=${apiKey}&page=50` //
    const searchUrl =`${apiPrefixURL}discover/movie?api_key=${apiKey}&page=1`
    
    const currentYear = new Date().getFullYear()
    const yearArray =[]
    for (let i= 0; i < 12; i ++){
        yearArray.push(currentYear - i)
    } //

    function handleSearchYearOrGenres(suffix){
        setYearOrGenreSuffix(suffix)
        fetch(`${searchUrl}${suffix}`)
        .then(res => res.json())
        .then(dataMovies =>  {
            setMoviesData(dataMovies.results)
            }
        )
    }
    
    const categoryButtons = categoryButtonArray.map(category => 
        <FilterCategory 
            key={category} 
            category={category} 
            genresArray={genresArray} //
            getGenresArray={getGenresArray} //
            yearArray={yearArray}
            handleSearchYearOrGenres={handleSearchYearOrGenres}
            setmovieCateogry={setmovieCateogry}
            setTogglePage2={setTogglePage2}
            currentCategorySelected={currentCategorySelected}
            setCurrentCategorySelected={setCurrentCategorySelected}
            setPageNumber={setPageNumber}
            setIsLoadMoreMovies={setIsLoadMoreMovies}
            isLoadMoreMovies={isLoadMoreMovies}
            isExtendedOptions={isExtendedOptions}
            setExtendedOptions={setExtendedOptions}
        />
    )
    
    function getGenresArray(){
        fetch(genresURL)
        .then(resp => resp.json())
        .then(genresArrayData => {
            setGenresArray(genresArrayData.genres)
        })
    } //

    function handleSubmit(e){
    e.preventDefault()
    if(searchInput.length > 0){
        setmovieCateogry("search/movie")
        setPageNumber(1)
        setSearchSuffix(`&query=${searchInput.replaceAll(" ", "%20").toLowerCase()}`)
        setTimeout(()=> {setTogglePage2(false)}, 110)
        setSearchInput("")
        setIsLoadMoreMovies(!isLoadMoreMovies)
        }
    }   
    
    return(
        <div className="SearchBar" onMouseLeave={()=>{setExtendedOptions(false)}}>
            <ul className="searchBarCategories">{categoryButtons}</ul>
            <form className="searchBarForm" onSubmit={(e) => handleSubmit(e)}>  
            <input type="text" placeholder=" Movie Name" value={searchInput} onChange={e => setSearchInput(e.target.value)} ></input>
            <button>Search</button>   
            </form>     
        </div>
    )
}



export default Search