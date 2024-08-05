// const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

export class Database {
    constructor() {
        this.mysql = mysql;
    }

    getDbConfig(db) {
        const databaseConfigs = {
            'tracking': {
                host: process.env.DB_TRACKING_HOST,
                port: process.env.DB_TRACKING_PORT,
                user: process.env.DB_TRACKING_USERNAME,
                password: process.env.DB_TRACKING_PASSWORD,
                database: process.env.DB_TRACKING_DATABASE
            },
            'shipping': {
                host: process.env.DB_SHIPPING_HOST,
                port: process.env.DB_SHIPPING_PORT,
                user: process.env.DB_SHIPPING_USERNAME,
                password: process.env.DB_SHIPPING_PASSWORD,
                database: process.env.DB_SHIPPING_DATABASE
            },
            'otherDatabase': {
                host: process.env.DB_OTHER_HOST,
                port: process.env.DB_OTHER_PORT,
                user: process.env.DB_OTHER_USERNAME,
                password: process.env.DB_OTHER_PASSWORD,
                database: process.env.DB_OTHER_DATABASE
            }
        };
        const config = databaseConfigs[db];
        if (!config) {throw new Error(`Database configuration not found for ${db}`)};
        return config;
    }

    connect(db) {
        return new Promise((resolve, reject) => {
        const config = this.getDbConfig(db);
        const conn = this.mysql.createConnection(config);
        console.log(`Connecting to ${db} database.`);
        conn.connect(error => {
            if (error) {
                console.error(`Error connecting to ${db} database`, error);
                reject(error);
            } else {
                console.log(`Connected to ${db} database`);
                resolve(conn);
            }
        });
    });
    }

    disconnect(conn, db) {
        if (conn) {
            conn.end(() => console.log(`Disconnected from ${db} database.`));
        }
    }

    executeQuery(conn, sqlSelectQuery) {
        return new Promise((resolve, reject) => {
            conn.query(sqlSelectQuery, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    async query(db, sqlSelectQuery) {
        let conn;
        let result = [];
        try {
            conn = await this.connect(db);  // Asegúrate de que `connect` sea asíncrono o devuelva una promesa
    
            console.log(`Processing: ${sqlSelectQuery}`);
            result = await this.executeQuery(conn, sqlSelectQuery); // Ejecuta la consulta y espera los resultados
        } catch (error) {
            console.error(`Error processing query: ${error}`);
            throw error;  // Relanza el error para manejo externo si es necesario
        } finally {
            this.disconnect(conn, db);  // Desconecta incluso si hay error
        }
        return result;
    }
}