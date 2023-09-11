import sql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

dotenv.config();


const dbConfig = {
    host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
};





export const dbConnection = sql.createConnection(dbConfig);


// export const dbConnect = () => {
   

// }

