const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Adminpanel')
  .then(() => console.log('DB Connected!')).catch((err) =>{
    console.log("err",err);
  })