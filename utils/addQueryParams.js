//Function
const addQueryParams = async (req) => {
    const {title, category, status, createdBy} = req.query
    let querySQL = []
    let queryParams = []

     if(title){
        querySQL.push('title like ?')
        queryParams.push(`${title}%`)
     }

    if(category){
        querySQL.push('category=?')
        queryParams.push(category)
     }

    if(status){
        querySQL.push('status=?')
        queryParams.push(status)
     }

    if(createdBy == 'true'){
        querySQL.push('createdBy=?')
        queryParams.push(req.user[0].user_id)
     }

    const result = {querySQL, queryParams}
    console.log(result)

    return result
}

//Export
module.exports = addQueryParams