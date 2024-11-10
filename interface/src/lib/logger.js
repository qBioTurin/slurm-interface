import { createLogger, format, transports} from 'winston';

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} | ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'app.log' })
    ]
  });
  
  export default logger;  