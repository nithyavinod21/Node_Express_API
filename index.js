const express=require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();

/* app.get('/',(req,res)=>{
   // res.send('<h1>Working in express</h1>');
   res.sendFile(path.join(__dirname,'public','index.html'));
})
 */
  //to intialize middleware
  app.use(logger);

  // Body Parser Middleware
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));

//Member API Route
 app.use('/api/members', require('./routes/api/memberRotuter'));
 

 app.use(express.static(path.join(__dirname,'public')))


const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})