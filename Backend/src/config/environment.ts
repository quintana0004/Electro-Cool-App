import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  DB_USER,
  DB_NAME,
  DB_PASS
} = process.env;

export = {
  PORT,
  DB_USER,
  DB_NAME,
  DB_PASS
}