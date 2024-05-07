import { testServer } from "../jest.setup";
import { disconnectFromDatabase } from "../../src/Server/database/connection";

describe('Users - Deletar por ID', () => {

	it('Deletar registro por ID ', async () => {
		const requis = await testServer
		.delete('/user/delete')
		.send(
			{
				"id": 3
			  }
			  
			  
		)
		expect(requis.statusCode).toEqual(200);
	})

	// Função afterAll para desconectar do banco de dados após a execução dos testes
	afterAll(() => {
		disconnectFromDatabase();
	})

})
