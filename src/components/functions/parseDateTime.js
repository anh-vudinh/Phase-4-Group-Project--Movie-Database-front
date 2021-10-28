function parseDateTime(dateTime){
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime)).replace(",", " - ")
}

export default parseDateTime