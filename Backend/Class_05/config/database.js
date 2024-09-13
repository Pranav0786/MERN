const mongoose = require("mongoose") ;

require("dotenv").config() ;

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => {
        console.log("DB Connected successfully") 
    })
    .catch( (error) => {
        console.log("DB connected Issue") ;
        console.error(error) ;
        process.exit(1) ;
    }) ;
}