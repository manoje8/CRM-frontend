const dateFormat = (date) => {
    return new Date(date).toLocaleString().split(',')[0]
}

export default dateFormat