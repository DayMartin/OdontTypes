import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'

// Função para buscar todos os estoque

const estoqueController = {

	getEstoques: async (_:Request, res:Response) => {
		const query = "SELECT * FROM estoque";

		try {
			const rows = await queryDatabase(query);

			// Verificar se tem estoque cadastrado
			if (rows.length === 0) {
				return res.status(404).json({ error: "Nenhum estoque cadastrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Estoques" });
		}
	},

	// Função para criar um novo Estoque
	createEstoque: async (req:Request, res:Response) => {
		const { nome, quantidade, fornecedor_id, categoria_id } = req.body;
		const query = "INSERT INTO estoque (nome, quantidade, fornecedor_id, categoria_id) VALUES (?, ?, ?, ?)";

		try {
			await queryDatabase(query, [nome, quantidade, fornecedor_id, categoria_id]);
			return res.status(201).json({ message: "Estoque criado com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao criar Estoque" });
		}
	},

	// Função para buscar um Estoque por ID
	getEstoque: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM estoque WHERE id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [id]);

			// Verificar se o Estoque foi encontrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Estoque não encontrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Estoque" });
		}
	},

	// Função para buscar um Estoque por categoria
	getCategoriaEstoque: async (req:Request, res:Response) => {
		const { categoria_id } = req.body;
		const query = "SELECT * FROM estoque WHERE categoria_id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [categoria_id]);

			// Verificar se o Estoque foi encontrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Estoque não encontrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Estoque" });
		}
	},

	// Função para buscar um Estoque por fornecedor
	getFornecedorEstoque: async (req:Request, res:Response) => {
		const { fornecedor_id } = req.body;
		const query = "SELECT * FROM estoque WHERE fornecedor_id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [fornecedor_id]);

			// Verificar se o Estoque foi encontrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Estoque não encontrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Estoque" });
		}
	},

	// Função para deletar um Estoque
	deleteEstoque: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM estoque WHERE id = ?";
		const queryDeletar = "DELETE FROM estoque WHERE id = ?";

		try {
			// Verificar se o Estoque existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Estoque não encontrado" });
			}

			// Se o Estoque existe, então deletá-lo
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "Estoque deletado com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar o Estoque" });
		}
	}
}

export { estoqueController };
