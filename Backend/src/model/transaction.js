import {sql} from '../config/db.js';

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount decimal(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("DB initialized successfully")

    } catch (error) {
        console.log("error while initializing database ", error);
        process.exit(1);
        
    }
    
}

export default initDB;