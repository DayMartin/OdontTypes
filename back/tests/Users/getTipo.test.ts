import { testServer } from "../jest.setup";
import { disconnectFromDatabase } from "../../src/Server/database/connection";

describe('Users - Consultar por Tipo', () => {

	it('Consultar registro por Tipo ', async () => {
		const requis = await testServer
		.post('/user/getAlltipo')
		.send(
			{
				"tipo": "paciente"
			}
			  
		)
		expect(requis.statusCode).toEqual(200);
	})

	// Função afterAll para desconectar do banco de dados após a execução dos testes
	afterAll(() => {
		disconnectFromDatabase();
	})

})
