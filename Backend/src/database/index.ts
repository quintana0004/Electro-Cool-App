import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ! ONLY USED UNTIL COMPANY FEATURE IS IMPLEMENTED
async function setupDummyCompany() {
  
  const allCompanies = await prisma.company.findMany();  
  
  if (allCompanies.length === 0) {
    console.log('--- CREATING DUMMY COMPANY ---');
    
    await prisma.company.create({
      data: {
        name: 'Prisma Company',
        businessType: 'ORM',
        addressLine1: 'Calle Buena Samaritana',
        country: 'PR',
        city: 'San Juan',
        zipcode: '00918',
      }
    });
  } 
  
}

export {
  setupDummyCompany,
  prisma
}
