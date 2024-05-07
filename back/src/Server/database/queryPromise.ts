import mysql, {ResultSetHeader} from 'mysql2';
import databaseConfig from "../../config";

const queryDatabase = async (sql: string, values?: any[]) => {

    let connection = mysql.createConnection(databaseConfig.config);

    const queryPromise = new Promise<any>((resolve, reject) => {
        connection.query<ResultSetHeader>(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    try {
        const [queryResults] = await Promise.all([queryPromise]);
		// Crie uma instância da classe ou objeto
		// const dbManager = new CreateTables();
		// // Chame o método createUsuariosTable()
		// dbManager.createUsuariosTable();

		// console.log("Conectado ao banco!");
        return queryResults;
    } finally {
        connection.end();
    }
};

export default queryDatabase;