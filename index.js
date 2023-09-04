const winston =require('winston');
const express= require('express');
const app= express();

  
require('./startup/logging.js')();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();



const port = process.env.PORT || 8000;
app.listen(port,()=>{
    winston.info(`Server is up and running on port http://127.0.0.1:${port}`);
});