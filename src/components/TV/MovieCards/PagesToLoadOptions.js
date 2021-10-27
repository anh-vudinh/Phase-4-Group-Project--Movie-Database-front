import React from "react";

function PagesToLoadOptions({setPagesToLoad, previousPage, pageNumber, totalPagesCount, currentPageCounter, pagesToLoad, setPageNumber, setCurrentPageCounter}){

    const pageOptionsArray = [1, 2, 3, 4, 5]                        // display how many pages? each page is 20 movies

    const pageOptionsBtns = pageOptionsArray.map((option, index) => 
        <button 
            key={index} 
            className={pagesToLoad === option? "pageOptionsBtnsSelected" : "pageOptionBtns"}
            onClick={()=>handleOnPageOptionClick(option)}
        >
            {option*20}                                             {/* pageOption is multiplied by 20 because there are 20 movies per page */}
        </button>
    )

    function handleOnPageOptionClick(option){                       // allows client to choose how many movies to load per page
        setPageNumber(previousPage)                                 // previousPage is set by MovieContainer.useEffect(), this way client won't lose their spot when changing pages to display                                                                          
        setCurrentPageCounter(1)                                    // error handling is done by MovieContainer.useEffect()
        setPagesToLoad(option)                                      // makes sure the pageCounter is reset, and tells useEffect how many pages to fetch                                                         
    }

    return(
        <div className="pageOptionsDiv">
            <div className ="pageOptionsContainer">
                <label>Display Movies: </label>
                {pageOptionsBtns}
            </div>
        </div>
    )
}

export default PagesToLoadOptions