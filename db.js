const mongoose = require('mongoose');
// const uri=`mongodb+srv://meal:meal@cluster0.inrvxch.mongodb.net/?retryWrites=true&w=majority`
const uri=`mongodb+srv://meal:meal@cluster0.inrvxch.mongodb.net/mealsApp?retryWrites=true&w=majority`

mongoose.connect(uri).then(()=>{
    console.log("Connected")
}).catch(error => console.log(error))