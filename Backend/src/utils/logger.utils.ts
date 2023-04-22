import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const transport: DailyRotateFile = new DailyRotateFile({
  frequency: "1d",
  dirname: "logs",
  filename: "errors-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "50m",
  maxFiles: "7d",
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
});

const logger = createLogger({
  transports: [transport],
});

function errorLogger(error: any) {
  if (error instanceof Error) {
    const errorMessage = `${error.message} ----- Cause: ${error.cause} ----- Stack ${error.stack}`;
    logger.error(errorMessage);
  }
}

export { errorLogger };
