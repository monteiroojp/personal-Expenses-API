//Function
const adddSortParams = (req) => {
    const {sort} = req.query
    let sortSQL = ''

    if(sort){
        const sortList = sort.split(',').map(sortItem => {
            let [field, order = 'ASC'] = sortItem.split(':')
            order = order.toUpperCase()
            return `${field} ${order}`         
        }).join(', ')
        sortSQL += ` ORDER BY ${sortList}`
    }

    return sortSQL   
}

module.exports = adddSortParams