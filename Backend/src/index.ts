import app from './app';
import db from './database/index';
import environment from './config/environment';


let PORT = environment.PORT || 5000;

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

app.listen(PORT, () => console.log(`Server is running https://localhost:${PORT}`));