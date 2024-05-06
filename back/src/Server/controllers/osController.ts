import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'
// Função para buscar todos os usuários

const osController = {

	getOss: async (_:Request, res:Response) => {
		const query = "SELECT * FROM os";

		try {
			const [rows, fields] = await queryDatabase(query);
			// Verificar se tem os cadastrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Nenhum OS cadastrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar OS's" });
		}
	},

	// Função para criar uma nova os
	createOs: async (req: Request, res: Response) => {
		const { servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status, parcelas } = req.body;
		const insertOsQuery = "INSERT INTO os (servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		const insertFinanceiroQuery = "INSERT INTO parcelas (os_id, parcela, valorParcela, dataPagamento, status) VALUES (?, ?, ?, ?, ?)";
	
		try {
			// Inserir na tabela 'os'
			const osResult = await queryDatabase(insertOsQuery, [servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status]);
	
			// Recuperar o ID da OS recém-criada
			const osId = osResult.insertId;
	
			// Verificar se parcelas é uma matriz antes de iterar sobre ela
			if (Array.isArray(parcelas)) {
				// Inserir na tabela 'parcelas' para cada parcela
				for (const parcela of parcelas) {
					await queryDatabase(insertFinanceiroQuery, [osId, parcela.parcela, parcela.valorParcela, parcela.dataPagamento, parcela.status]);
				}
			} else {
				// Lidar com o caso em que parcelas não é uma matriz
				console.error("O campo 'parcelas' não é uma matriz.");
				return res.status(400).json({ error: "O campo 'parcelas' deve ser uma matriz." });
			}
	
			return res.status(201).json({ message: `OS criada com sucesso` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao criar OS" });
		}
	},
	

	// Função para buscar um usuário
	getOs: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM os WHERE id = ?";

		try {
			const [rows] = await queryDatabase(query, [id]);

			// Verificar se a OS foi encontrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "OS não encontrado" });
			}

			// Se a OS foi encontrado, retornar os dados
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar OS" });
		}
	},

	// Função para deletar uma OS
	deleteOS: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM os WHERE id = ?";
		const queryDeletar = "DELETE FROM os WHERE id = ?";

		try {
			// Verificar se a OS existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "OS não encontrada" });
			}

			// Se a OS existe, então deletá-la
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "OS deletada com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar a OS" });
		}
	} 

}

export { osController };