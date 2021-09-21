import React, {useEffect, useState} from "react";
import Trailer from "./Trailer";
import informationIcon from "../../../assets/informationIcon.png"
import languageBubble from "../../../assets/languageBubble.png"
import wwwLinkIcon from "../../../assets/wwwLinkIcon.png"

function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL, setYearOrGenreSuffix, setmovieCateogry, broken_path, setMovie, movie, toggleHeaderInfo, setToggleHeaderInfo, togglePage2, setTogglePage2, genresList, setGenresList, movieID, setMovieID, movieArray, setMovieArray}){
    const [companyLogosArray, setcompanyLogosArray] = useState([])
    const companyLogoPrefix = "https://www.themoviedb.org/t/p/h50_filter(negate,0,666)"
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const randomMoviePageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const randomOrSpecificMovieURL = typeof movieID === "string"? 
        `${apiUrl}${movieID}?api_key=${apiKey}${randomMoviePageNumber}`:`${apiUrl}movie/${movieID}?api_key=${apiKey}`

    useEffect(()=>{
        fetch(randomOrSpecificMovieURL)
        .then(res => res.json())
        .then(randomMovieObj => {
            handlePageLoad(randomMovieObj)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])
    
    useEffect(()=>{
        createCompanyLogoImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    const genreLI = genresList.map(listItem => 
        <li key={listItem.name} 
            className="headerGenresLI" 
            onClick={()=> {
                setYearOrGenreSuffix(`&with_genres=${listItem.id}`)
                setmovieCateogry("Genres")
                setTimeout(()=> {setTogglePage2(false)}, 120)
                }
            }
        >  
            {listItem.name} 
        </li>)

    const companyLogos = companyLogosArray.length > 0? companyLogosArray.map(company => <img key={company.id} src={`${companyLogoPrefix}${company.logo_path}`} alt={company.name}/>) : null
    
    function createCompanyLogoImages(){
        //prevent undefined because of first invoke happens before obj is assigned,
        //filter out null because some donot have logo paths, map available logo paths
        if(movie.production_companies !== undefined) {
            if(movie.production_companies.length > 0){
                setcompanyLogosArray((movie.production_companies.filter(company => company.logo_path !== null)))
            }
        }
    }


    function handlePageLoad(randomMovieArray){
        if(((movieID === "popular" || movieID ==="movie/popular") && randomMovieArray.results !== undefined)){
            setMovie(randomMovieArray.results[randomMovieIndex])     
            setMovieID(randomMovieArray.results[randomMovieIndex].id) 
        }else if (typeof movieID === "number" ){
            setMovie(randomMovieArray)
            setGenresList([...randomMovieArray.genres])
        }
    }

    return(
        <>
            <div className="headerBannerContainer">
                <img className={toggleHeaderInfo? "headerDisplayInfoSmall" : "headerDisplayInfoBig"} src= {informationIcon}alt="headerDisplayInfoIcon" onClick={()=> setToggleHeaderInfo(toggleHeaderInfo => !toggleHeaderInfo)}/>
                <img className="headerBannerBackground" src={movie.backdrop_path === null ? broken_path : `https://www.themoviedb.org/t/p/w640_and_h360_multi_faces/${movie.backdrop_path}`} alt={movie.title}></img>
                <div className="headerBannerCompanyLogo">{companyLogos}</div>
            </div>
            
            <div className={toggleHeaderInfo? "headerImageContainer" : "hidden"}>
                <div className="movie-details">
                <img className="headerImage" src={movie.backdrop_path === null ? broken_path : `${poster_prefixURL}${movie.poster_path}`} alt={movie.title}></img>
                    <h1>{movie.title} 
                        <span style={{fontSize:"22px"}}> ({movie.length !== 0 ? movie.release_date.slice(0,4) : null })</span>
                        <div className="languageContainer">
                            <img className="languageBox" src={languageBubble} alt={movie.original_language}/>
                            <p className="languageText">{movie.original_language !== undefined? movie.original_language.toUpperCase() : ""}</p>
                        </div>
                    </h1>
                    <em>{movie.vote_average} / 10⭐ </em>
                    <span> ({Math.floor(movie.runtime/60)}h {movie.runtime % 60}mins)</span>
                    <p className="headerMovieOverview">{movie.overview}</p>
                    <div className="headerGenresDiv">Genres: <span><ul className="headerGenresUL">{genreLI}</ul></span></div>
                    <div className="headerStatus"><p>{`${movie.status}`}</p></div>
                    {movie.homepage !== ""? <a href={`${movie.homepage}`} target="_blank" rel="noreferrer"><img className="headerLinkIcon" src={wwwLinkIcon} alt="Homepage Link"/></a> : null}
                </div>
            </div>

            <Trailer movie={movie} togglePage2={togglePage2} apiKey={apiKey} movieArray={movieArray} setMovieArray={setMovieArray}/>
            
        </>

    )

}

export default Header