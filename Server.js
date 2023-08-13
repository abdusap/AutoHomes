const express= require('express')
const app=express()
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
// const session = require('express-session')
const path=require('path');
const userRouter = require('./Routes/userRoute');
// const fileupload=require('express-fileupload')
// const userRoute=require('./Routes/userRoute')
// const adminRoute=require('./Routes/adminRoute')
require('dotenv').config()

// Database section
require('./Config/DB')

//For not storing Cache
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

// Session
// app.use(session({
//   secret: 'Tech-Kart-ecommerce-site',
//   name: 'TechKart-Session',
//   resave: false,
//   saveUninitialized: true
// }))


// For parsing the url to json,string or array format
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  For parsing the cookeies
app.use(cookieParser())

// Port specified
const port= process.env.PORT


//  Setting view Engine
app.set('view engine', 'ejs')

// for adding external files to view engine
const staticPath=path.join(__dirname,'Public')
app.use(express.static(staticPath))
app.use("/Public", express.static(path.join(__dirname, "Public")));
 

// For routing to user side
app.use('/',userRouter)

// For routing to admin side
// app.use('/admin',adminRoute)

// For Error 404 
// app.use('*',(req,res)=>{
//   res.redirect('/404')
// }) 

// For post listening
app.listen(port,()=>console.log(`Server is running at  http://localhost:${port}`))
