import React, {useState, useEffect} from "react";
import eyeballicon from "../../../assets/eyeballicon.png"
import eyeballClosedicon from "../../../assets/eyeballClosedicon.png"

function MovieExtraInfo({movie, handleWatchListAddClick, setIsWatchedMP2C, isWatchedMP2C , isLoggedIn}){

    const [companyLogosArray, setcompanyLogosArray] = useState([])
    const companyLogoPrefix = "https://www.themoviedb.org/t/p/h50_filter(negate,0,666)"
    const {budget, revenue, popularity, production_countries} = movie

    const productionCountries = production_countries === undefined? "No Data" : 
        production_countries.map((country,index) => 
            <p key={index}>
                <img className="flagImage" src={`https://www.countryflagicons.com/FLAT/64/${country.iso_3166_1}.png`} alt="flag" title={country.iso_3166_1}/>
            </p>
    )

    const companyLogos = companyLogosArray.length > 0? companyLogosArray.map((company, index) => company.logo_path === null? 
        <p className="logoPFiller" key={`logoFiller${index}`}>{company.name}</p>
        : <img key={company.id} src={`${companyLogoPrefix}${company.logo_path}`} alt={company.name} title={company.name}/> )
        : null

    useEffect(()=>{
        createCompanyLogoImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])


    function createCompanyLogoImages(){
        //prevent undefined because of first invoke happens before obj is assigned,
        //filter out null because some donot have logo paths, map available logo paths
        if(movie.production_companies !== undefined) {
            if(movie.production_companies.length > 0){
                setcompanyLogosArray([...movie.production_companies.filter(company => company.logo_path !== null),
                    ...movie.production_companies.filter(company => company.logo_path === null)])
            }
        }
    }

    function handleMouseDown(){
        const slider = document.querySelector('.columnD');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e)=> {
            e.preventDefault();
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        })
    
        slider.addEventListener('mouseleave', ()=> {
            isDown = false;
            slider.classList.remove('active');
        })
    
        slider.addEventListener('mouseup', ()=> {
            isDown = false;
            slider.classList.remove('active');
        })
    
        slider.addEventListener('mousemove', (e)=> {
            if(!isDown) return; //stop function from running
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX)*2;
            slider.scrollLeft = scrollLeft - walk;
        })
    }


    function handleEyeballClick(){
        if(isLoggedIn === false) return;
        handleWatchListAddClick(movie, isWatchedMP2C)
        setIsWatchedMP2C(!isWatchedMP2C)
    }

    return(
        <div className="extraMovieInfoContainer">
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
                            <div className="extraInfoDetailEyeball" onClick={handleEyeballClick}><img src={isWatchedMP2C? eyeballicon : eyeballClosedicon} alt="eyeball" title={isLoggedIn === false? "Log in first!" : "Add/Remove from Watchlist"}/></div>
                    </div>
                </div>
                <div className="columnD" onMouseDown={(e)=> handleMouseDown(e)}>
                    <div className="companyLogo">{companyLogos}</div>               
                </div>
            </div>
        </div>
    )
}

export default MovieExtraInfo