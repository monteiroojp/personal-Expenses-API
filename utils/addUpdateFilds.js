//Function
const addUpdateFilds = (filds) => {
    let updateSQL = ""
    Object.keys(filds).forEach(key => {
        updateSQL += `${key}=?, `
    })

    return updateSQL.slice(0, -2)
}

//Export
module.exports = addUpdateFilds