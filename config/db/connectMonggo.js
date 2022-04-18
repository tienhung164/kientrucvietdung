const ACCEES_PASSWORD_MONGODB ='AiLX1phD0DU2zhMP'
const mongoose = require('mongoose')

const connect = ()=>{   
    
    mongoose.connect(`mongodb+srv://tienhung1:${ACCEES_PASSWORD_MONGODB}@pallgree.be2rz.mongodb.net/kientrucvietdung?retryWrites=true&w=majority`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
}
module.exports={connect}