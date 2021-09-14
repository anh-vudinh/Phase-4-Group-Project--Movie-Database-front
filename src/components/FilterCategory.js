import React, {useState} from "react";

function FilterCategory({category, handleDropDownLI, genresArray, getGenresArray}){

    const [isExtendedOptions, setExtendedOptions] = useState(false)
    
    const genre = genresArray.map(genreA => 
        <button key={genreA.id} onClick={()=> handleDropDownLI(genreA.id)}>{genreA.name}</button>
    )

    function handleDropDownLI(categoryName){
        switch (categoryName){
            case 'Genres':
                getGenresArray(categoryName)
                setExtendedOptions(!isExtendedOptions)
                console.log(categoryName)
                break;
            case 'Year Release':
                console.log(categoryName)
                setExtendedOptions(!isExtendedOptions)
                break;
            default:
                console.log(categoryName)
                setExtendedOptions(false)
        }
    }

    return(
        <li className="categoryLI">
            <button onClick={() => handleDropDownLI(category)}>{category}</button>
            {isExtendedOptions === true && category === "Genres"? genre : null}
        </li>
    );
}

export default FilterCategory;