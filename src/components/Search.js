import React,{useState} from "react";
import FilterCategory from './FilterCategory'

function Search({setmovieCateogry, apiKey, setMoviesData, setTotalPagesCount, setSuffix, setSearchSuffix}){
    

    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&page=50`
    const categoryButtonArray = ["Popular","Top Rated", "Genres", "Year Release", "Upcoming"]
    const [genresArray, setGenresArray] = useState([])
    const searchUrl =`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`
    //&year=2020&with_genres=28
    
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
            //console.log(dataMovies.results)
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
    console.log(query.replaceAll(" ", "%20").toLowerCase())
    setmovieCateogry("search/movie")
    setSearchSuffix(`&query=${query.replaceAll(" ", "%20").toLowerCase()}`)
    setQuery("")
    }   
    

    return(
        <div className="SearchBar">
            <ul>{categoryButtons}</ul> 

            <form onSubmit={(e) => handleSubmit(e)}>  
            <input type="text" placeholder="Search Movie Name" value={query} onChange={e => setQuery(e.target.value)} ></input>
            <button>Search</button>   
            </form>     
        </div>
        

    )
}



export default Search