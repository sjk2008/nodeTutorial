const express = require('express') //it's mode.js frame work
const mongoose = require('mongoose') //it is require to set the connection with mongodb
const morgan = require('morgan')//which api is called 
const bodyParser = require('body-parser') //this is use to parse the body in api

const dotenv = require('dotenv')
dotenv.config()

const EmployeeRoute = require('./routes/Employee')
const Auth = require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser:true, useUnifiedTopology:true })
//mongodb localhost 27017 and testbd is the name
const db  = mongoose.connection

db.on('error' , (err) => {
    console.log("db_error: ",err)
})

db.once('open', ()=>{
    console.log('Database Connection Established!')
})

const  app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', Auth)
