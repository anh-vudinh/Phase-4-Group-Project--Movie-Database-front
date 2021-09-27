import React from "react";

function FilterCategory({category, yearOrGenreSuffix,movieCateogry, togglePage2, genresArray, getGenresArray, yearArray, handleSearchYearOrGenres, setmovieCateogry, currentCategorySelected, setCurrentCategorySelected, setPageNumber, setIsLoadMoreMovies, isLoadMoreMovies, isExtendedOptions, setExtendedOptions}){

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
                    replaceGenreOrYearTitle(category, extra[0])
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
                    replaceGenreOrYearTitle(category, extra[0])
                    setPageNumber(1)
                    handleSearchYearOrGenres(`&primary_release_year=${extra[0]}`)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
                break;
            default:
                replaceGenreOrYearTitle(categoryName, extra[0])
                setPageNumber(1)
                setExtendedOptions(false)
                setmovieCateogry(`movie/${categoryName.replaceAll(" ", "_").toLowerCase()}`)
                setCurrentCategorySelected(categoryName)
                setIsLoadMoreMovies(!isLoadMoreMovies)
        }
    }

    function replaceGenreOrYearTitle(categoryName, extendedOption){
        const mainCategory = document.querySelector(".mainCategoryOptionsSelected button")
        if(categoryName === "Genres"){
            document.querySelector(".searchBarCategories").children.item(3).childNodes[0].childNodes[0].textContent = "Year Release"
            mainCategory.textContent = genresArray.find(genre => genre.id === extendedOption).name
        }else if(categoryName === "Year Release"){
            document.querySelector(".searchBarCategories").children.item(2).childNodes[0].childNodes[0].textContent = "Genres"
            mainCategory.textContent = extendedOption
        }else{
            document.querySelector(".searchBarCategories").children.item(3).childNodes[0].childNodes[0].textContent = "Year Release"
            document.querySelector(".searchBarCategories").children.item(2).childNodes[0].childNodes[0].textContent = "Genres"
        }
    }

    return(
        <li className="categoryLI">
            <div className={movieCateogry.replaceAll(" ", "_").toLowerCase().includes(category.replaceAll(" ", "_").toLowerCase()) && !togglePage2? "mainCategoryOptionsSelected" : "mainCategoryOptions"}>
                <button onClick={() => handleDropDownLI(category)}>{category}</button>
            </div>

            {isExtendedOptions === true && category === "Genres" && currentCategorySelected === "Genres"? <div className="extendedCategoryOptions">{genreOptionBtn}</div> : null}
            {isExtendedOptions === true && category === "Year Release" && currentCategorySelected === "Year Release"? <div className="extendedCategoryOptions">{yearOptionBtn}</div> : null}
        </li>
    );
}

export default FilterCategory;