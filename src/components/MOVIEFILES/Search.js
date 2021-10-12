import React, {useState} from "react";
import FilterCategory from './FilterCategory'

function Search({setmovieCateogry, genreTitle, setGenreTitle, yearTitle, setYearTitle, togglePage2, yearOrGenreSuffix, apiKey, apiPrefixURL, movieCateogry, setMoviesData, setYearOrGenreSuffix, setSearchSuffix, setPageNumber, setIsLoadMoreMovies, isLoadMoreMovies}){
    
    const categoryButtonArray = ["Popular", "Top Rated", "Genres", "Year Release", "Upcoming"]
    const [genresArray, setGenresArray] = useState([])
    const [isExtendedOptions, setExtendedOptions] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [currentCategorySelected, setCurrentCategorySelected] = useState("")

    const genresURL = `${apiPrefixURL}genre/movie/list?api_key=${apiKey}&page=50`
    const searchUrl =`${apiPrefixURL}discover/movie?api_key=${apiKey}&page=1`
    
    const currentYear = new Date().getFullYear()
    const yearArray =[]
    for (let i=0; i < 12; i++){
        yearArray.push(currentYear - i)
    }

    const categoryButtons = categoryButtonArray.map(category => 
        <FilterCategory 
            key={category}
            category={category === "Genres"? category === "Year Release"? yearTitle.title : genreTitle.title : category} //part of making mainCategory title dynamic
            genresArray={genresArray}
            getGenresArray={getGenresArray}
            movieCateogry={movieCateogry}
            yearArray={yearArray}
            togglePage2={togglePage2}
            handleSearchYearOrGenres={handleSearchYearOrGenres}
            setmovieCateogry={setmovieCateogry}
            currentCategorySelected={currentCategorySelected}
            setCurrentCategorySelected={setCurrentCategorySelected}
            setPageNumber={setPageNumber}
            setIsLoadMoreMovies={setIsLoadMoreMovies}
            isLoadMoreMovies={isLoadMoreMovies}
            isExtendedOptions={isExtendedOptions}
            setExtendedOptions={setExtendedOptions}
            yearOrGenreSuffix={yearOrGenreSuffix}
            genreTitle={genreTitle}
            yearTitle={yearTitle}
            setGenreTitle={setGenreTitle}
            setYearTitle={setYearTitle}
        />
    )

    function handleSearchYearOrGenres(suffix){
        setYearOrGenreSuffix(suffix)
        fetch(`${searchUrl}${suffix}`)
        .then(res => res.json())
        .then(dataMovies =>  {
            setMoviesData(dataMovies.results)
            }
        )
    }
    
    function getGenresArray(){
        fetch(genresURL)
        .then(resp => resp.json())
        .then(genresArrayData => {
            setGenresArray(genresArrayData.genres)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(searchInput.length > 0){
            setYearTitle({...yearTitle, extTitle:""})
            setGenreTitle({...genreTitle, extTitle:""})
            setmovieCateogry("search/movie")
            setPageNumber(1)
            setSearchSuffix(`&query=${searchInput.replaceAll(" ", "%20").toLowerCase()}`)
            setSearchInput("")
            setIsLoadMoreMovies(!isLoadMoreMovies)
        }
    }

    return(
        <div className="SearchBar">
            <ul className="searchBarCategories">{categoryButtons}</ul>
            <form className="searchBarForm" onSubmit={(e) => handleSubmit(e)}>  
            <input type="text" placeholder=" Movie Name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <button>Search</button>   
            </form>     
        </div>
    )
}

export default Search