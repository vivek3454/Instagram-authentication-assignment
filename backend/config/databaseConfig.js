const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://0.0.0.0:27017/my_database';

const databaseConnect = ()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((response)=> console.log(`connected to DB: ${response.connection.host}`))
    .catch((error) => console.log(error.message))
}

module.exports = databaseConnect;
