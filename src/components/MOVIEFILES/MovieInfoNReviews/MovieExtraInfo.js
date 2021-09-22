import React from "react";

function MovieExtraInfo({movie, togglePage2}){
    const {budget, revenue, popularity, production_countries} = movie
    //budget, revenue, popularity, production_countries[0].name
    const productionCountries = production_countries === undefined? "No Data" : 
    production_countries.map((country,index) => 
        //console.log(country.name.replace(" ", "-").indexOf(" ") === -1? country.name.toLowerCase().replace(" ", "-") : country.name.toLowerCase().replace(" ", "-").substring(0,country.name.toLowerCase().replace(" ", "-").indexOf(" ")))
        <p key={index}>
        {country.name}
        <img className="flagImage" src={`https://www.countryflags.io/${country.iso_3166_1}/flat/32.png`} alt="flag"/>
        </p>
    )

    return(
        <div className={togglePage2? "extraMovieInfoContainer" : "hidden"}>
            <div className="financesContainer">
                <div className="financesItems">
                    <div className="extraInfoDetailContainer"><p>Budget {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(budget)}</p></div>
                    <div className="extraInfoDetailContainer"><p>Revenue {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(revenue)}</p></div>
                </div>
                <div className="extraInfoDetailContainer"><p className={revenue-budget >= 0? "profit":"loss"}>Net {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(revenue-budget)}</p></div>
            </div>
          
            <div className="extraInfoDetailContainer"><p>Popularity {Math.round(popularity)}</p></div>
            <div className="extraInfoDetailContainer"><div className="flagContainer">{productionCountries}</div></div>
        </div>
    )
}

export default MovieExtraInfo