const mongoose = require('mongoose');
require ('../secrets');
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mycluster-wowkv.mongodb.net/Havelsan?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error',console.error.bind(console,'Connection Error'))
db.once('open',()=>{
    console.log('Connected to Database')
})

module.exports = mongoose;