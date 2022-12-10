const express = require('express');
const userRoutes = require('./routes/userRoutes')
const likeRoutes = require('./routes/likeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const cors = require('cors');
const app = express();
require('./db');
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(userRoutes);
app.use(likeRoutes);
app.use(commentRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node.js!!')
})
app.listen(process.env.PORT || 4000, ()=>{
    console.log('Server running at 4000');
})
