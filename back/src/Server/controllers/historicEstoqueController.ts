import { Request, Response } from 'express';
import queryDatabase from '../database/queryPromise'

// Função para buscar todos os historicos de estoque

const historicEstoqueController = {

	getHistoricEstoques: async (_:Request, res:Response) => {
		const query = "SELECT * FROM estoqueHistoric";

		try {
			const rows = await queryDatabase(query);

			// Verificar se tem histórico de estoque cadastrado
			if (rows.length === 0) {
				return res.status(404).json({ error: "Nenhum histórico de estoque cadastrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar histórico de estoque" });
		}
	},

	// Função para criar um novo Histórico de Estoque
	createHistoricEstoque: async (req:Request, res:Response) => {
		const { tipo, quantidade, estoque_id } = req.body;
		const query = "INSERT INTO estoqueHistoric (tipo, quantidade, estoque_id) VALUES (?, ?, ?)";
		
		// Query para atualizar dados em estoque
		const updateEstoque = "UPDATE estoque SET quantidade = ? WHERE id = ?";

		// Consulta os dados atualizados do estoque
		const queryEstoque = "SELECT * FROM estoque WHERE id = ?";
		const [estoqueData] = await queryDatabase(queryEstoque, [estoque_id]);
		const extracaoQuantidade = estoqueData.quantidade
		const extracaoId = estoqueData.id
		// console.log("EXTRAÇÃO DO ID", extracaoId);
		try {
			if ( tipo === "Entrada" ){

			const soma = extracaoQuantidade + quantidade
			// console.log("VALOR DA SOMA", soma);

			// Atualiza a quantidade do estoque
			await queryDatabase(updateEstoque, [soma, extracaoId]);

			// // Insere o histórico do estoque
			await queryDatabase(query, [tipo, quantidade, estoque_id]);

			return res.status(201).json({ message: "Entrada cadastrada com sucesso" });
			}
			if ( tipo === "Saída"){
			// console.log("EXTRAÇÃO DA QUANTIDADE", extracaoId);
			const subtracao = extracaoQuantidade - quantidade
			// console.log("VALOR DA SUBTRAÇÃO", subtracao);

			// Atualiza a quantidade do estoque
			await queryDatabase(updateEstoque, [subtracao, extracaoId]);

			// // Insere o histórico do estoque
			await queryDatabase(query, [tipo, quantidade, estoque_id]);
			return res.status(201).json({ message: "Saída cadastrada com sucesso" });
			}

		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao criar Histórico" });
		}
	},

	// Função para buscar um Histórico de Estoque por ID
	getHistoricEstoque: async (req:Request, res:Response) => {
		const { id } = req.body;
		const query = "SELECT * FROM estoqueHistoric WHERE id = ?";

		try {
			const [rows, fields] = await queryDatabase(query, [id]);

			// Verificar se o Histórico de Estoque foi encontrado
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Histórico de Estoque não encontrado" });
			}
			return res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao buscar Histórico de Estoque" });
		}
	},

	// Função para buscar um Histórico de Estoque por ID do estoque
	getEstoque: async (req:Request, res:Response) => {
		const { estoque_id } = req.body;
		const query = "SELECT * FROM estoqueHistoric WHERE estoque_id = ?";

		try {
			const rows = await queryDatabase(query, [estoque_id]);

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
	deleteHistoricEstoque: async (req:Request, res:Response) => {
		const { id } = req.body;
		const queryVerificar = "SELECT * FROM estoqueHistoric WHERE id = ?";
		const queryDeletar = "DELETE FROM estoqueHistoric WHERE id = ?";

		try {
			// Verificar se o Histórico de Estoque existe
			const [rows] = await queryDatabase(queryVerificar, [id]);
			if (rows === null || rows === undefined) {
				return res.status(404).json({ error: "Histórico de Estoque não encontrado" });
			}

			// Se o Histórico de Estoque existe, então deletá-lo
			await queryDatabase(queryDeletar, [id]);
			return res.status(200).json({ message: "Histórico de Estoque deletado com sucesso" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao deletar o Estoque" });
		}
	}
}

export { historicEstoqueController };
