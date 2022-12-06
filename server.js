const express = require('express');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const app = express();
require('./db');
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(userRoutes);
// app.listen(process.env.PORT || 4000)
app.listen(4000, ()=>{
    console.log('Server running at 4000');
})