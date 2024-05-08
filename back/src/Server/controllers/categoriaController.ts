import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'

// Função para buscar todos as Categoria

const categoriaController = {

	getCategorias: async (_:Request, res:Response) => {
		const query = "SELECT * FROM categoria";

		try {
			const rows = await queryDatabase(query);

			// Verificar se tem categoria cadastrada
			if (rows.length === 0) {
				return res.status(404).json({ error: "Nenhum categoria cadastrada" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar categorias" });
		}
	},

	// Função para criar uma nova Categoria
	createCategoria: async (req:Request, res:Response) => {
		const { nome } = req.body;
		const query = "INSERT INTO categoria (nome) VALUES (?)";

		try {
			await queryDatabase(query, [nome]);
			return res.status(201).json({ message: "Categoria criada com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao criar Categoria" });
		}
	},

	// Função para buscar uma Categoria por ID
	getCategoria: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM categoria WHERE id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [id]);

			// Verificar se o Categoria foi encontrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Categoria não encontrada" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Categoria" });
		}
	},

	// Função para deletar uma Categoria
	deleteCategoria: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM categoria WHERE id = ?";
		const queryDeletar = "DELETE FROM categoria WHERE id = ?";

		try {
			// Verificar se o Categoria existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Categoria não encontrada" });
			}

			// Se a Categoria existe, então deletá-la
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "Categoria deletada com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar a Categoria" });
		}
	}
}

export { categoriaController };
