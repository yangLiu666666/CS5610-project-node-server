const express = require('express');
const userRoutes = require('./userRoutes')
const app = express();
require('./db');
app.use(userRoutes);
app.use(express.urlencoded({extended: true}));

// app.listen(process.env.PORT || 4000)
app.listen(4000, ()=>{
    console.log('Server running at 4000');
})