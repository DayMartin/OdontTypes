import { testServer } from "../jest.setup";
import { disconnectFromDatabase } from "../../src/Server/database/connection";

describe('Users - Create', () => {

	it('Create registro', async () => {
		const requis = await testServer
		.post('/user/create')
		.send(
			{
				"tipo": "paciente",
				"cpfcnpj": "12345678900",
				"nome": "Doria",
				"telefone": "(99) 991745323",
				"endereco": "Rua dr jose maria whitaker",
				"email": "paciente6@gmail.com",
				"senha": "giovana0407",
				"status":"Ativo"
			  }
		)
		expect(requis.statusCode).toEqual(201);
	})

	// Função afterAll para desconectar do banco de dados após a execução dos testes
	afterAll(() => {
		disconnectFromDatabase();
	})

})
