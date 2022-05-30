import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const sequelize = new Sequelize({
  database: config.database, 
  username: config.username,
  password: config.password, 
  dialect: config.dialect,
  host: config.host,
  port: config.port,
  models: [__dirname + '/models']
});

async function syncrhonize() {
  await sequelize.sync();
}

syncrhonize();

export default sequelize;
