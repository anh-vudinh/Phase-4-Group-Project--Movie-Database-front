import React,{useState} from "react";
import FilterCategory from './FilterCategory'

function Search({setmovieCateogry, apiKey, setMoviesData, setTotalPagesCount, setSuffix, setSearchSuffix, setTogglePage2}){
    

    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&page=50`
    const categoryButtonArray = ["Popular","Top Rated", "Genres", "Year Release", "Upcoming"]
    const [genresArray, setGenresArray] = useState([])
    const searchUrl =`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`
    
    const currentYear = new Date().getFullYear()
    const yearArray =[]
    for (let i= 0; i < 5; i ++){
        yearArray.push(currentYear - i)
    }

    function handleSearchYearOrGenres(suffix){
        setSuffix(suffix)
        console.log(`${searchUrl}${suffix}`)
        fetch(`${searchUrl}${suffix}`)
        .then(res => res.json())
        .then(dataMovies =>  {setMoviesData(dataMovies.results)
        }
        )

    }
    


    const categoryButtons = categoryButtonArray.map(category => 
        <FilterCategory 
        key={category} 
        category={category} 
        genresArray={genresArray}
        getGenresArray={getGenresArray}
        yearArray={yearArray}
        handleSearchYearOrGenres={handleSearchYearOrGenres}
        setmovieCateogry={setmovieCateogry}
        setTogglePage2={setTogglePage2}
       
        />
    )
    
    function getGenresArray(categoryName){
        fetch(genresURL)
        .then(resp => resp.json())
        .then(genresArrayData => { console.log(genresArrayData)
            setGenresArray(genresArrayData.genres)
        })
    }
    const [query, setQuery] = useState("")

    function handleSubmit(e){
    e.preventDefault()
    console.log(query.length)
    if(query.length > 0){
    setmovieCateogry("search/movie")
    setSearchSuffix(`&query=${query.replaceAll(" ", "%20").toLowerCase()}`)
    setTimeout(()=> {setTogglePage2(false)}, 110)
    setQuery("")

    }
    }   
    

    return(
        <div className="SearchBar">
            <ul className="searchBarCategories">{categoryButtons}</ul> 

            <form className="searchBarForm" onSubmit={(e) => handleSubmit(e)}>  
            <input type="text" placeholder="Search Movie Name" value={query} onChange={e => setQuery(e.target.value)} ></input>
            <button>Search</button>   
            </form>     
        </div>
        

    )
}



export default Search