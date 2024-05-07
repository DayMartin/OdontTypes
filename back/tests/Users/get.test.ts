import { testServer } from "../jest.setup";
import supertest  from 'supertest' 
import { disconnectFromDatabase } from "../../src/Server/database/connection";

describe('Users - Consulta', () => {

	it('Consulta registro', async () => {
		const { body, status } = await testServer.get('/user/all');
		expect(status).toBe(200);
		expect(body).toEqual(
			[
				{
				  "id": 2,
				  "tipo": "medico",
				  "cpfcnpj": "12345678900",
				  "nome": "Doria",
				  "telefone": "(99) 991745323",
				  "endereco": "Rua dr jose maria whitaker",
				  "email": "medico2@gmail.com",
				  "senha": "giovana0407",
				  "status": "Ativo",
				  "data_criacao": "2024-05-06T17:33:59.000Z"
				},
				{
				  "id": 3,
				  "tipo": "medico",
				  "cpfcnpj": "12345678900",
				  "nome": "Doria",
				  "telefone": "(99) 991745323",
				  "endereco": "Rua dr jose maria whitaker",
				  "email": "paciente@gmail.com",
				  "senha": "giovana0407",
				  "status": "Ativo",
				  "data_criacao": "2024-05-06T18:30:44.000Z"
				},
				{
				  "id": 4,
				  "tipo": "paciente",
				  "cpfcnpj": "12345678900",
				  "nome": "Doria",
				  "telefone": "(99) 991745323",
				  "endereco": "Rua dr jose maria whitaker",
				  "email": "paciente2@gmail.com",
				  "senha": "giovana0407",
				  "status": "Ativo",
				  "data_criacao": "2024-05-06T18:32:45.000Z"
				},
				{
				  "id": 5,
				  "tipo": null,
				  "cpfcnpj": null,
				  "nome": null,
				  "telefone": null,
				  "endereco": null,
				  "email": null,
				  "senha": null,
				  "status": null,
				  "data_criacao": "2024-05-07T17:53:47.000Z"
				},
				{
				  "id": 6,
				  "tipo": null,
				  "cpfcnpj": null,
				  "nome": null,
				  "telefone": null,
				  "endereco": null,
				  "email": null,
				  "senha": null,
				  "status": null,
				  "data_criacao": "2024-05-07T17:54:18.000Z"
				},
				{
				  "id": 7,
				  "tipo": "paciente",
				  "cpfcnpj": "12345678900",
				  "nome": "Doria",
				  "telefone": "(99) 991745323",
				  "endereco": "Rua dr jose maria whitaker",
				  "email": "paciente5@gmail.com",
				  "senha": "giovana0407",
				  "status": "Ativo",
				  "data_criacao": "2024-05-07T18:01:00.000Z"
				}
			  ]
		)
	})

	// Função afterAll para desconectar do banco de dados após a execução dos testes
	afterAll(() => {
		disconnectFromDatabase();
	})

})
