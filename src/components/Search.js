import React,{useState, useEffect} from "react";


function Search({setmovieCateogry, apiKey}){

    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&page=50`
    const categoryButtonArray =["Popular","Top Rated", "Latest", "Genres", "Year Release"]
    function getGenresArray(){
        fetch(genresURL)
        .then(resp => resp.json())
        .then(genresArrayData => console.log(genresArrayData))
    }
    const categoryButtons = categoryButtonArray.map(category => 
    <li key={category}>    
    <button onClick={() => console.log(category)}>{category}</button> 
    
    </li>)

    return(
        <div className="SearchBar">
            <ul>{categoryButtons}</ul>
           
        </div>

    )
}



export default Search