import React from "react";

function FilterCategory({category, genreTitle, yearTitle, setYearTitle, setGenreTitle, yearOrGenreSuffix,movieCateogry, togglePage2, genresArray, getGenresArray, yearArray, handleSearchYearOrGenres, setmovieCateogry, currentCategorySelected, setCurrentCategorySelected, setPageNumber, setIsLoadMoreMovies, isLoadMoreMovies, isExtendedOptions, setExtendedOptions}){

    const genreOptionBtn = genresArray.map(genreOption => 
        <button 
            key={genreOption.id} 
            onClick={()=> handleDropDownLI("Genres", genreOption.id)}
            className={yearOrGenreSuffix.includes(genreOption.id) && !togglePage2? "extendedCategoryOptionsBtnSelected" : "extendedCategoryOptionsBtn"}
        >
            {genreOption.name}
        </button> 
    )

    const yearOptionBtn = yearArray.map(yearOption => 
        <button 
            key={yearOption} 
            onClick={()=> handleDropDownLI("Year Release", yearOption)}
            className={yearOrGenreSuffix.includes(yearOption) && !togglePage2? "extendedCategoryOptionsBtnSelected" : "extendedCategoryOptionsBtn"}
        >
            {yearOption}
        </button>
    )

    function handleDropDownLI(categoryName, ...extra){
        switch (categoryName){
            case 'Genres':
                getGenresArray()
                setExtendedOptions(true)
                setmovieCateogry(categoryName)
                setCurrentCategorySelected(categoryName)
                if(typeof extra[0] === "number"){
                    setGenreTitle({...genreTitle, extTitle:genresArray.find(genre => genre.id === extra[0]).name})
                    setYearTitle({...yearTitle, extTitle:""})
                    setPageNumber(1)
                    handleSearchYearOrGenres(`&with_genres=${extra[0]}`)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
                break;
            case 'Year Release':
                setmovieCateogry(categoryName)
                setExtendedOptions(true)
                setCurrentCategorySelected(categoryName)
                if(typeof extra[0] === "number"){      
                    setYearTitle({...yearTitle, extTitle:extra[0]})
                    setGenreTitle({...genreTitle, extTitle:""})
                    setPageNumber(1)
                    handleSearchYearOrGenres(`&primary_release_year=${extra[0]}`)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
                break;
            default:
                setYearTitle({...yearTitle, extTitle:""})
                setGenreTitle({...genreTitle, extTitle:""})
                setPageNumber(1)
                setExtendedOptions(false)
                setmovieCateogry(`movie/${categoryName.replaceAll(" ", "_").toLowerCase()}`)
                setCurrentCategorySelected(categoryName)
                setIsLoadMoreMovies(!isLoadMoreMovies)
        }
    }

    return(
        <li className="categoryLI" onMouseLeave={()=>{setExtendedOptions(false)}}>
            <div className={movieCateogry.replaceAll(" ", "_").toLowerCase().includes(category.replaceAll(" ", "_").toLowerCase()) && !togglePage2? "mainCategoryOptionsSelected" : "mainCategoryOptions"}>
                <button className={`${category.replaceAll(" ", "_")}`} onClick={() => handleDropDownLI(category)}>
                    {category === "Year Release" || category === "Genres"? 
                        category === "Genres"? genreTitle.extTitle === ""? genreTitle.title : genreTitle.extTitle 
                        : yearTitle.extTitle === ""? yearTitle.title : yearTitle.extTitle 
                        : category
                    }
                </button>
            </div>
            {category === "Genres"? 
                <div className={isExtendedOptions === true && currentCategorySelected === "Genres"? "extendedCategoryOptions fade-in" : "extendedCategoryOptions"}>{genreOptionBtn}</div>
            : null}
            {category === "Year Release"? 
                <div className={isExtendedOptions === true && currentCategorySelected === "Year Release"? "extendedCategoryOptions fade-in" : "extendedCategoryOptions"}>{yearOptionBtn}</div>
            : null} 
        </li>
    );
}

export default FilterCategory;