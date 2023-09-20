import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Create a Sequelize instance for database connection
export const sequelizeObj = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,         // Database host
    username: process.env.DB_USER,     // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_DATABASE, // Database name
});

/**
 * Function to connect to the database and synchronize models.
 */
export async function dbConnect() {
    try {
        // Synchronize models with the database (force:false means no data loss)
        await sequelizeObj.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Problem in synchronizing database:', error);
    }
}
