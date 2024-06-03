//Import utils
const {BadRequest} = require('../errors/index')

//Function
const validateFilds = (filds) => {
    for(let i = 0; i < filds.length; i++){
        if(!filds[i]){
            throw new BadRequest('Please fill all the filds before sending the response!')
        }
    }
}


module.exports = validateFilds