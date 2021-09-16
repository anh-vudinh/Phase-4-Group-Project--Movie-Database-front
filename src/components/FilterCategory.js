import React, {useState} from "react";

function FilterCategory({category, genresArray, getGenresArray, yearArray, handleSearchYearOrGenres, setmovieCateogry, setTogglePage2}){

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
               // getGenresArray(categoryName )
                getGenresArray()
                setExtendedOptions(!isExtendedOptions)
                setmovieCateogry(categoryName)
                if(typeof extra[0] === "number"){
                    handleSearchYearOrGenres(`&with_genres=${extra[0]}`)}
                    setTimeout(()=> {setTogglePage2(false)}, 110)
                break;
            case 'Year Release':
                setmovieCateogry(categoryName)
                setExtendedOptions(!isExtendedOptions)
                if(typeof extra[0] === "number"){
                    handleSearchYearOrGenres(`&primary_release_year=${extra[0]}`)}
                    setTimeout(()=> {setTogglePage2(false)}, 110)        
                break;
            default:
                setExtendedOptions(false)
                setmovieCateogry(`movie/${categoryName.replaceAll(" ", "_").toLowerCase()}`)
                setTimeout(()=> {setTogglePage2(false)}, 110)
                //console.log(categoryName.replaceAll(" ", "_").toLowerCase())
        }
    }

    return(
        <li className="categoryLI">
            <button onClick={() => handleDropDownLI(category)}>{category}</button>

            {isExtendedOptions === true && category === "Year Release"? yearOptionBtn : null}

            {isExtendedOptions === true && category === "Genres"? genreOptionBtn : null}
        </li>
    );
}

export default FilterCategory;