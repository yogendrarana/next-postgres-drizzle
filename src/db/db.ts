import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// import schemas


// import relations


// create pool connection
const pool = new pg.Pool({ connectionString: process.env.DB_URI! });

// create drizzle instance
export const db = drizzle(pool, {
    schema: {
    },
});