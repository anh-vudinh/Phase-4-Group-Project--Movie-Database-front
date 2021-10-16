import React, {useEffect, useState} from "react";
import TextArea from "./TextArea";

function ReviewReadMore({movie, parseDateTime, parseSanitizeHTML, sessionToken, displayReadMore, readMoreDetails, BASE_URL_BACK, setDisplayReadMore, avatarPrefix, blankAvatar}){
    const{author_details, content, updated_at, author} = readMoreDetails
    const [toggleTextBox, setToggleTextBox] = useState(false)
    const [readMoreArrayBE, setReadMoreArrayBE] = useState([])
    
    useEffect(()=>{
        fetch(`${BASE_URL_BACK}responses/getResponses/${readMoreDetails.id}`)
        .then(resp => resp.json())
        .then(data => {
            setReadMoreArrayBE(data)
        })
    },[])


    const readMoreResponses = readMoreArrayBE.map((response, index) => 

        response.author === author?

        <div className="readMoreResponsesOG" key={index}>
            <div className="readMoreResponsesOGProfile">
                <div className="readMoreResponsesOGPicture">
                    <img alt="author" src={response.avatar_path === null ? blankAvatar : `${avatarPrefix}${response.avatar_path}` }/>
                </div>
                <div className="readMoreResponsesOGName">
                    {response.author}
                </div>
            </div>
            <div className="readMoreResponsesOGBubble">
                <div className="readMoreResponsesOGText">
                    {parseSanitizeHTML(response.content)}
                </div>
                <div className="readMoreResponsesOGDateTime">
                    {parseDateTime(response.updated_at)}
                </div>
            </div>
        </div>

        :

        <div className="readMoreResponses" key={index}>
            <div className="rMResponseBubble">
                <div className="rMResponseText">
                    {parseSanitizeHTML(response.content)}
                </div>
                <div className="rMResponseDateTime">
                    {parseDateTime(response.updated_at)}
                </div>
            </div>
            <div className="rMResponseProfile">
                <div className="rMResponsePicture">
                    <img alt="author" src={response.avatar_path === null ? blankAvatar : `${avatarPrefix}${response.avatar_path}` }/>
                </div>
                <div className="rMResponseName">
                    {response.author}
                </div>
            </div>
        </div>
    )

    return(
        <div className="readMoreContainer">
            <div className="readMoreUnderlay" onClick={()=>setDisplayReadMore(false)}></div>
            <div className="readMoreCardContainer">
                <div className="threadStarter">
                    <div className="tSProfile">
                        <div className="tSPicture">
                            <img alt="author" src={author_details.avatar_path === null ? blankAvatar : author_details.avatar_path.includes("http") ? author_details.avatar_path.slice(1)  : `${avatarPrefix}${author_details.avatar_path}` }/>
                        </div>
                        <div className="tSName">
                            {author}
                        </div>
                    </div>
                    <div className="tSBubble">
                        <div className="tSText">
                            {parseSanitizeHTML(content)}
                        </div>
                        <div className="tSDateTime">
                            {parseDateTime(updated_at)}
                        </div>
                    </div>
                    <img className="tSIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F13%2FCircle-icons-megaphone.svg%2F120px-Circle-icons-megaphone.svg.png&f=1&nofb=1" alt="megaphone"/>
                </div>

                {readMoreResponses}

                <div className="readMoreEmptyReply">
                    <div className="rMERBubble" onClick={()=> setToggleTextBox(true)}>
                        <div className="rMERText">
                            {toggleTextBox? 
                                <TextArea
                                    readMoreArrayBE={readMoreArrayBE} setReadMoreArrayBE={setReadMoreArrayBE}
                                    displayReadMore={displayReadMore}
                                    readMoreDetails={readMoreDetails}
                                    BASE_URL_BACK={BASE_URL_BACK} 
                                    movie={movie}
                                    sessionToken={sessionToken}
                                /> 
                            : <p>Leave a reply!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ReviewReadMore