import { Request, Response } from 'express';
// import db from '../database/conn'
import queryDatabase from '../database/queryPromise'


const usersController = {
    // Função para buscar todos os usuários
    getUsers: async (_: Request, res: Response) => {
        const query = "SELECT * FROM usuarios";

        try {
            const rows  = await queryDatabase(query);
            // Verificar se tem serviço cadastrado
            if (rows === null || rows === undefined) {
                return res.status(404).json({ error: "Nenhum usuário cadastrado" });
            }
            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    },

    // Função para criar um novo usuário
    createUser: async (req: Request, res: Response) => {
        const { tipo, cpfcnpj, nome, telefone, endereco, email, senha, status } = req.body;
        const query = "INSERT INTO usuarios (tipo, cpfcnpj, nome, telefone, endereco, email, senha, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            // Verifica se o email já está cadastrado
            const emailExistsQuery = "SELECT * FROM usuarios WHERE email = ?";
            const [emailRows] = await queryDatabase(emailExistsQuery, [email]);

            if (emailRows) {
                return res.status(400).json({ error: "Usuário já cadastrado" });
            }
            await queryDatabase(query, [tipo, cpfcnpj, nome, telefone, endereco, email, senha, status]);
            return res.status(201).json({ message: `Usuário criado com sucesso` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao criar usuário" });
        }
    },

    // Função para buscar um usuário
    getUser: async (req: Request, res: Response) => {
        const { id } = req.body;
        const query = "SELECT * FROM usuarios WHERE id = ?";

        try {
            const [rows] = await queryDatabase(query, [id]);

            // Verificar se o usuário foi encontrado
            if (rows === null || rows === undefined) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            // Se o usuário foi encontrado, retornar os dados
            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    },

    // Função para buscar um usuário por tipo
    getUserTipo: async (req: Request, res: Response) => {
        const { tipo } = req.body;
        const query = "SELECT * FROM usuarios WHERE tipo = ?";

        try {
            const [rows] = await queryDatabase(query, [tipo]);

            // Verificar se o usuário foi encontrado
            if (rows === null || rows === undefined) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            // Se o usuário foi encontrado, retornar os dados
            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    },

    // Função para deletar um Usuario
    deleteUser: async (req: Request, res: Response) => {
        const { id } = req.body;
        const queryVerificar = "SELECT * FROM usuarios WHERE id = ?";
        const queryDeletar = "DELETE FROM usuarios WHERE id = ?";

        try {
            // Verificar se o Usuario existe
            const [rows] = await queryDatabase(queryVerificar, [id]);
            if (rows === null || rows === undefined) {
                return res.status(404).json({ error: "Usuario não encontrado" });
            }

            // Se o Usuario existe, então deletá-lo
            await queryDatabase(queryDeletar, [id]);
            return res.status(200).json({ message: "Usuario deletado com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao deletar o Usuario" });
        }
    },
};

export { usersController };
