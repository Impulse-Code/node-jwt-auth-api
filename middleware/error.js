const winston = require('winston');

module.exports = function(err,req, res, next) {
    // log error/exceptions to a log file
    winston.error(err.message, err);
    res.status(500).send(err);
    
};  