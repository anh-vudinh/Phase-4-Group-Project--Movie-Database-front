import React, {useEffect, useState} from "react";
import CpSearchItem from "./CpSearchItem";
import BlankPoster from "../../assets/blankposter.jpg"

function CpSearch({filteredSearchArray, setFilteredSearchArray}) {

    const [searchedMovie, setSearchedMovie] = useState({moviename:""})
    const apiPrefixURL = "https://api.themoviedb.org/3/"
    const apiKey = '9b9db796275919f97fb742c582ab0008'

    function handleMovieSearchOnChange(e){
        setSearchedMovie({[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(searchedMovie.moviename === "") return;
        const timeout = setTimeout(fetchSearchedMovie, 700);
        return ()=> clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchedMovie])

    function fetchSearchedMovie(){
        fetch(`${apiPrefixURL}search/movie?api_key=${apiKey}&query=${searchedMovie.moviename.replaceAll(" ", "%20").toLowerCase()}&page=1`)
        .then(resp => resp.json())
        .then(data => {
            setFilteredSearchArray(data.results)
        })
    }

    const searchListItem = filteredSearchArray.map((movie, index) => 
        <CpSearchItem 
            key={index}
            movie={movie}
            broken_path={BlankPoster}
        />
    )

    return (
        <div className="searchMoviesContainer">
            <div className="searchMoviesColumnTitle">
                <p>Search Movies</p>
            </div>
            <input className="cpMovieSearch" placeholder="Search Movie" name="moviename" value={searchedMovie.moviename} onChange={handleMovieSearchOnChange}/>
            <div className="cpSearchMovieItemContainer">
                {searchListItem}
            </div>
        </div>
    )
}


export default CpSearch;