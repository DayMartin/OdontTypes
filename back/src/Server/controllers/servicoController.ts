import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'

// Função para buscar todos os servicos

const servicosController = {

	getService: async (_:Request, res:Response) => {
		const query = "SELECT * FROM servicos";

		try {
			const rows = await queryDatabase(query);

			// Verificar se tem serviço cadastrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Nenhum serviço cadastrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Serviços" });
		}
	},

	// Função para criar um novo Serviço
	createServico: async (req:Request, res:Response) => {
		const { nome, descricao, preco_avulso, preco_convenio, status } = req.body;
		const query = "INSERT INTO servicos (nome, descricao, preco_avulso, preco_convenio, status) VALUES (?, ?, ?, ?, ?)";

		try {
			await queryDatabase(query, [nome, descricao, preco_avulso, preco_convenio, status]);
			return res.status(201).json({ message: "Serviço criado com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao criar Serviço" });
		}
	},

	// Função para buscar um servico
	getServico: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM servicos WHERE id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [id]);

			// Verificar se o serviço foi encontrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Serviço não encontrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar serviço" });
		}
	},

	// Função para deletar um serviço
	deleteServico: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM servicos WHERE id = ?";
		const queryDeletar = "DELETE FROM servicos WHERE id = ?";

		try {
			// Verificar se o serviço existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Serviço não encontrado" });
			}

			// Se o serviço existe, então deletá-lo
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "Serviço deletado com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar o serviço" });
		}
	}
}

export { servicosController };
