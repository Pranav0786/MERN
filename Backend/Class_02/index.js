const express = require("express") ;
const app = express() ;

// load config from env file
require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

// middleware to pass json request body
app.use(express.json()) ;

// import routes for Todo API
const todoRoutes = require("./routes/todos") ;
// mount the todo API routes
app.use("/api/v1",todoRoutes) ;

// start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`) ;
})

// connect to the database
const dbConnect = require("./Config/database") ;
dbConnect() ;


// default Route
app.get("/" , (req,res) => {
    res.send(`<h1>This is HOMEPAGE baby</h1>`) ;
})