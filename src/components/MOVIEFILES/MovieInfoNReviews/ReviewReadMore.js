import React, {useState} from "react";
import TextArea from "./TextArea";

function ReviewReadMore({readMoreDetails, setDisplayReadMore, avatarPrefix, blankAvatar, sessionUsername, sessionProfilePic}){
    const{author_details, content, created_at} = readMoreDetails
    const [toggleTextBox, setToggleTextBox] = useState(false)
    
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
                            {author_details.username}
                        </div>
                    </div>
                    <div className="tSBubble">
                        <div className="tSText">
                            {content}
                        </div>
                        <div className="tSDateTime">
                            {Date.parse(created_at)}
                        </div>
                    </div>
                    <img className="tSIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F13%2FCircle-icons-megaphone.svg%2F120px-Circle-icons-megaphone.svg.png&f=1&nofb=1" alt="megaphone"/>
                </div>

                <div className="readMoreReplies">

                </div>

                <div className="readMoreEmptyReply">
                    <div className="rMERBubble" onClick={()=> setToggleTextBox(true)}>
                        <div className="rMERText">
                            {toggleTextBox? <TextArea/> : <p>Leave a reply!</p>}
                        </div>
                    </div>
                    <div className="rMERProfile">
                        <div className="rMERPicture">
                            <img alt="author" src={sessionProfilePic === ""? blankAvatar : sessionProfilePic}/>
                        </div>
                        <div className="rMERName">
                            {sessionUsername === ""? "Log in" : sessionUsername}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ReviewReadMore