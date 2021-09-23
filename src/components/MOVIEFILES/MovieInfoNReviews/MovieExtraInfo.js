import React, {useState, useEffect} from "react";

function MovieExtraInfo({movie, togglePage2}){

    const [companyLogosArray, setcompanyLogosArray] = useState([])
    const companyLogoPrefix = "https://www.themoviedb.org/t/p/h50_filter(negate,0,666)"
    const {budget, revenue, popularity, production_countries} = movie

    const productionCountries = production_countries === undefined? "No Data" : 
    production_countries.map((country,index) => 
        <p key={index}>
            <img className="flagImage" src={`https://www.countryflags.io/${country.iso_3166_1}/flat/32.png`} alt="flag"/>
        </p>
    )

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

    useEffect(()=>{
        createCompanyLogoImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    return(
        <div className={togglePage2? "extraMovieInfoContainer" : "hidden"}>
            <div className="columnA">
                <label>Finance</label>
                <div className="financesContainer">
                    <div className="financesItems">
                        <div className="extraInfoDetailContainer"><p>Budget {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(budget)}</p></div>
                        <div className="extraInfoDetailContainer"><p>Revenue {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(revenue)}</p></div>
                    </div>
                    <div className="extraInfoDetailContainer"><p className={revenue-budget === 0? "neutral" : revenue-budget > 0? "profit" : "loss"}>Net {Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(revenue-budget)}</p></div>
                </div>                
            </div>
            <div className="sectionB">
                <div className="topSection">
                    <div className="columnB">
                        <label>Production</label>
                        <div className="productionContainer">
                            <div className="flagContainer">{productionCountries}</div>                
                        </div>
                    </div>
                    <div className="columnC">
                            <label>Popularity</label>
                            <div className="extraInfoDetailContainer"><p>{Math.round(popularity)}</p></div>                
                    </div>
                </div>
                <div className="columnD">
                    <div className="companyLogo">{companyLogos}</div>               
                </div>
            </div>
        </div>
    )
}

export default MovieExtraInfo