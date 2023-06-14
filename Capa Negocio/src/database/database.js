import mysql2 from "mysql2/promise";
import config from "./../config";

const connection = mysql2.createConnection({
  host: config.host,
  port: config.port,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

const getConnection = async () => {
    return await connection;
};

module.exports = {
    getConnection
};