import { Sequelize } from 'sequelize-typescript';
import Company from './models/company';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const sequelize = new Sequelize({
  database: config.database, 
  username: config.username,
  password: config.password, 
  dialect: config.dialect,
  host: config.host,
  port: config.port,
  models: [__dirname + '/../models']
});


// ! USED JUST DURING DEVELOPMENT WHILE WE SETUP UP COMPANY CREATION
async function createDummyCompany() {

  try {

    let companies: Company[] = await Company.findAll();
    
    if (companies.length === 0) {      
      await Company.create({
        name: 'Dummy Company',
        business_type: 'Car Dealer',
        address_line_1: 'Stree 66',
        country: 'PR',
        city: 'San Juan',
        zipcode: '00918',
        email: 'test@gmail.com',
        phone: '(787) 555-5555'
      });
    }
    
  } catch (error) {
    console.log('Error Creating Dummy Company: ', error);   
  }

}

async function syncrhonize() {
  
  await sequelize.sync({
    alter: true,
  });

  await createDummyCompany();

}


export {
  syncrhonize,
  sequelize as db
};
