import mysql from 'mysql2';
import databaseConfig from "../../config";
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { CreateTables } from './createTables';

let connection: Connection;

const connectToDatabase = () => {
    console.log('Conectando ao banco de dados...');
	// QUANDO FOR RODAR OS TESTES COMENDTAR ISTO: 
		// Crie uma instância da classe ou objeto
	const dbManager = new CreateTables();
		// // Chame o método createAllTables()
	dbManager.createAllTables();
    connection = mysql.createConnection({
        ...databaseConfig.config,
        charset: 'UTF8_GENERAL_CI'
    });
    return connection;
};

const disconnectFromDatabase = () => {
    if (connection) {
        console.log('Desconectando do banco de dados...');
        connection.end();
    }
};

export { connectToDatabase, disconnectFromDatabase };
