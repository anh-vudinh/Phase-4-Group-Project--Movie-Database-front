import parse from "html-react-parser"
import sanitizeHtml from 'sanitize-html';

function parseSanitizeHTML(string){
    return parse(sanitizeHtml(string))
}

export default parseSanitizeHTML