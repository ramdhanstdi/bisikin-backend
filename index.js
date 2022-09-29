const {PORT: port} = process.env;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(cors());

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