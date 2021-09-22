import React, {useState} from "react";

function FilterCategory({category, genresArray, getGenresArray, yearArray, handleSearchYearOrGenres, setmovieCateogry, setTogglePage2, currentCategorySelected, setCurrentCategorySelected, setPageNumber, setIsLoadMoreMovies, isLoadMoreMovies}){
    
    const [isExtendedOptions, setExtendedOptions] = useState(false)

    const genreOptionBtn = genresArray.map(genreOption => 
        <button key={genreOption.id} onClick={()=> handleDropDownLI("Genres", genreOption.id)} >{genreOption.name}</button> 
    )

    const yearOptionBtn = yearArray.map(yearOption => 
        <button key={yearOption} onClick={()=> handleDropDownLI("Year Release", yearOption)}>{yearOption}</button>
    )

    function handleDropDownLI(categoryName, ...extra){
        switch (categoryName){
            case 'Genres':
                getGenresArray()
                setExtendedOptions(true)
                setmovieCateogry(categoryName)
                setCurrentCategorySelected(categoryName)
                if(typeof extra[0] === "number"){
                    setPageNumber(1)
                    handleSearchYearOrGenres(`&with_genres=${extra[0]}`)
                    setExtendedOptions(false)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
                setTimeout(()=> {setTogglePage2(false)}, 110)
                break;
            case 'Year Release':
                setmovieCateogry(categoryName)
                setExtendedOptions(true)
                setCurrentCategorySelected(categoryName)
                if(typeof extra[0] === "number"){
                    setPageNumber(1)
                    handleSearchYearOrGenres(`&primary_release_year=${extra[0]}`)
                    setExtendedOptions(false)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
                setTimeout(()=> {setTogglePage2(false)}, 110)  
                break;
            default:
                setPageNumber(1)
                setExtendedOptions(false)
                setmovieCateogry(`movie/${categoryName.replaceAll(" ", "_").toLowerCase()}`)
                setTimeout(()=> {setTogglePage2(false)}, 110)
                setCurrentCategorySelected(categoryName)
                setIsLoadMoreMovies(!isLoadMoreMovies)
        }
    }

    return(
        <li className="categoryLI">
            <div className="mainCategoryOptions">
                <button onClick={() => handleDropDownLI(category)}>{category}</button>
            </div>

            {isExtendedOptions === true && category === "Genres" && currentCategorySelected === "Genres"? <div className="extendedCategoryOptions">{genreOptionBtn}</div> : null}
            {isExtendedOptions === true && category === "Year Release" && currentCategorySelected === "Year Release"? <div className="extendedCategoryOptions">{yearOptionBtn}</div> : null}
        </li>
    );
}

export default FilterCategory;