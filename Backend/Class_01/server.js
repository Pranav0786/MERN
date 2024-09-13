
// server Instantiate
const express = require('express') ;
const app = express() ;

// used to parse req.body in express => PUT or POST
const bodyParser = require('body-parser') ;

// specifically parse JSON data & add it to the request.Body object
app.use(bodyParser.json()) ;

// activate the server on 3000 port
app.listen(3000, () => {
    console.log("Server started at post no. 3000") ;
});

// Routes
app.get('/', (req,res) => {
    res.send("hello jee") ;
})

app.post('/api/cars', (req,res) => {
    const {name ,brand} =  req.body ;
    console.log(name)
    console.log(brand) ;
    res.send("car submitted successfully") ; 
})

const mongoose = require('mongoose') ;
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewurlParser:true,
    useUnifiedTopology:true
})
.then( () => {console.log("Connection Successful")})
.catch( (error) => {console.log("Received an error")})