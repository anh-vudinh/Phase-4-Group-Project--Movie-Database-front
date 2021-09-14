import React,{useState, useEffect} from "react";
import FilterCategory from './FilterCategory'

function Search({setmovieCateogry, apiKey}){

    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&page=50`
    const categoryButtonArray = ["Popular","Top Rated", "Latest", "Genres", "Year Release"]
    const [genresArray, setGenresArray] = useState([])
    
    const [yearArray, setYearArray] = useState([])

    console.log(new Date().getFullYear())


    const categoryButtons = categoryButtonArray.map(category => 
        <FilterCategory 
        key={category} 
        category={category} 
        genresArray={genresArray}
        getGenresArray={getGenresArray}/>
    )
    
    function getGenresArray(categoryName){
        fetch(genresURL)
        .then(resp => resp.json())
        .then(genresArrayData => 
            setGenresArray(genresArrayData.genres)
        )
    }

    return(
        <div className="SearchBar">
            <ul>{categoryButtons}</ul>           
        </div>

    )
}



export default Search