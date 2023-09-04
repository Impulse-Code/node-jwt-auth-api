const winston =require('winston');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = function(){
    // connect to DB
    mongoose
			.connect(process.env.MONGO_URL,{ useUnifiedTopology: true })
			.then(() => winston.info("Successfully connected to MongoDB..."));
};