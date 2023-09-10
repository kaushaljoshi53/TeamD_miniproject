import sql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3036'),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const dbConnection = sql.createConnection(dbConfig);


export const dbConnect = () => {
    dbConnection.connect((err) => {
        if (err) {
            console.error("DB connection error", err);
            // Consider handling the error more gracefully (e.g., app shutdown).
        } else {
            console.log("DB connected successfully");
        }
    });

}

