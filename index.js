const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require("./config/database.js");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))





const Auth = require('./routes/auth.js');

app.use('/api/auth',Auth);


const Post = require('./routes/post.js');

app.use('/api/post',Post);





const PORT = process.env.PORT || 5000;


db();

app.listen(PORT, ()=>{
    console.log('server is running');
})