function parseDate(date){
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
      };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date)).replace(",", " - ")
}

export default parseDate