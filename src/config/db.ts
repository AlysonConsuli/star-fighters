import pg from "pg";
import "./setup.js";

const { Pool } = pg;

const devConfig = {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
};

const prodConfig = { connectionString: process.env.DATABASE_URL };

const db = new Pool(process.env.MODE === "PROD" ? prodConfig : devConfig);
export default db;
