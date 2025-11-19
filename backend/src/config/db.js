const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || '',
  database: DB_NAME || 'placement_cell',
  port: DB_PORT ? Number(DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then((conn) => {
    conn.release();
    console.log('✅ Connected to MySQL database');
  })
  .catch((error) => {
    console.error('❌ Unable to connect to MySQL database', error);
  });

module.exports = pool;

