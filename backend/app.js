const express = require('express');
const router = require('./routes/auth');
const databaseConnect = require('./config/databaseConfig');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

databaseConnect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));


app.use('/api/auth', router);

app.use('/',(req,res)=>{
    res.status(200).json({data: 'JWTauth server'})
})


module.exports = app;