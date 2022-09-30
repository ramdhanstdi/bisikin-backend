require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/', require('./src/routes'));

app.get('/',(req,res)=>{
  return res.json({
    success: true,
    message: 'backend run'
  });
});

app.use('*',(req,res)=>{
  return res.status(404).json({
    success: false,
    message: 'Path Not Found'
  });
});

app.listen(port,()=>{
  console.log(`App Run In Port ${port}`);
});