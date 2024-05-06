import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'
// Função para buscar todos os usuários

const parcelasController = {

	getParcelas: async (_:Request, res:Response) => {
		const query = "SELECT * FROM parcelas";

		try {
			const [rows, fields] = await queryDatabase(query);
			// Verificar se tem Parcela cadastrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Nenhuma Parcela cadastrada" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Parcelas" });
		}
	},

	// Função para buscar uma parcela
	getParcela: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM parcelas WHERE id = ?";

		try {
			const [rows] = await queryDatabase(query, [id]);

			// Verificar se a Parcela foi encontrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Parcela não encontrado" });
			}

			// Se a Parcela foi encontrado, retornar os dados
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar OS" });
		}
	},

	// Função para buscar uma parcela por id_os
	getParcelaOs: async (req:Request, res:Response) => {
		const { os_id } = req.body;
		const query = "SELECT * FROM parcelas WHERE os_id = ?";

		try {
			const [rows] = await queryDatabase(query, [os_id]);

			// Verificar se a parcelas foi encontrada
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Parcela não encontrada" });
			}

			// Se a parcelas foi encontrado, retornar os dados
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Parcela" });
		}
	},

	// Função para deletar uma Parcela
	deleteParcela: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM parcelas WHERE id = ?";
		const queryDeletar = "DELETE FROM parcelas WHERE id = ?";

		try {
			// Verificar se a Parcela existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Parcela não encontrada" });
			}

			// Se a Parcela existe, então deletá-la
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "Parcela deletada com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar a Parcela" });
		}
	} 

}

export { parcelasController };