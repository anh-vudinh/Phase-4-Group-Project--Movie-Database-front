import React from "react";

function ReviewReadMore({readMoreDetails, setDisplayReadMore}){

    return(
        <div className="readMoreUnderlay" onClick={()=>setDisplayReadMore(false)}>
        
        </div>
    )

}

export default ReviewReadMore