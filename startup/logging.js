const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    // process.on('uncaughtException',(ex)=>{
    //     console.log('WE GOT AN UNCAUGHT EXCEPTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.exceptions.handle(
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtExceptions.log'})
    );
    
    process.on('unhandledRejection',(ex)=>{
        console.log('WE GOT AN UNHANDLED REJECTION');
        winston.error(ex.message, ex);
        process.exit(1);
        // throw ex;
    });
    
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({
        db:'mongodb://127.0.0.1/authApi',
        level:'error' //This is optional to only log error messages to the db
        }));
     
};