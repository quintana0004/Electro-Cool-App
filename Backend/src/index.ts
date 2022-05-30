import app from './app';
// import { db, syncrhonize } from './database/index';
import environment from './config/environment';
import { setupDummyCompany } from './database';


let PORT = environment.PORT || 5000;

setupDummyCompany()
  .then(() => console.log('--- DATABASE IS READY ---'))
  .catch((e) => {
    throw e
  });

app.listen(PORT, () => console.log(`Server is running https://localhost:${PORT}`));