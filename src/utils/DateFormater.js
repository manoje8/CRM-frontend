const dateFormat = (date) => {
    if(!date) return "NA"
    const formated = new Date(date).toLocaleString().split(',')[0]
    return formated
}

export default dateFormat