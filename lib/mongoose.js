const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get("mongo.connectionString"));

const dbConnection = mongoose.connection;

mongoose.set('debug', config.get("mongo.debug"));

dbConnection.on("error", function(){
    console.log("mongoose connection error");
});

dbConnection.once("open", function(dbConnection){
    console.log("mongoose start");
});

module.exports = mongoose;