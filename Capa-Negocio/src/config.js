import {config} from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    port: process.env.PORT || "",
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "",
};