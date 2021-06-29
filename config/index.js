log4js = require("log4js");
const path = require('path');
log4js.configure(
    {
        appenders: {
            file: {
                type: 'file',
                filename: path.resolve(process.env.BE_NODE_LOG_PATH_CONTAINER, 'app.log'),
                maxLogSize: 10 * 1024 * 1024, // = 10Mb
                backups: 5, // keep five backup files
                compress: false, // compress the backups
                layout: {
                    type: 'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss} %-5p %c{1} %f:%l - %m%n',
                },
                encoding: 'utf-8',
                mode: 0o0666,
                flags: 'w+'
            },
            out: { type: 'stdout', layout: {
                    type: 'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss} %[%-5p%] %c{1} %f:%l - %m%n',
                }},
        },
        categories: {
            debug: {
                appenders: ['out'],
                level: process.env.LOG_LEVEL,
                enableCallStack: true
            },
            error: {
                appenders: ['file','out'],
                level: process.env.LOG_LEVEL,
                enableCallStack: true
            },
            default: {
                appenders: ['file','out'],
                level: process.env.LOG_LEVEL,
                enableCallStack: true
            }
        }
    }
);
global.log = log4js.getLogger(process.env.LOG_LEVEL);


