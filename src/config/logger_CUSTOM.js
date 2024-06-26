const winston = require('winston')
const config = require('./config')

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    }
}

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './erros.log',
                level: "debug",
                format: winston.format.simple()
            }
        )
    ]
})


const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: './erros.log', level: "http" })
    ]
})


 const addLogger = (req, res, next) => {

    if (config.environment === "production") {
        req.logger = prodLogger;

        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
       


    } else {
        req.logger = devLogger;

        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
      
    }
    next();
}

module.exports = addLogger