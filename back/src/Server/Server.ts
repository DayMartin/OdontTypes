import express from 'express';
import { router } from './routes/router';
import 'dotenv/config';
import queryDatabase from "../Server/database/queryPromise"
import { CreateTables } from './database/conn';

const server = express();

server.use(express.json());
server.use(router);

// Create tables

// Crie uma instância da classe ou objeto
const dbManager = new CreateTables();
// Chame o método createUsuariosTable()
dbManager.createAllTables();

// Routes
server.use("/api", router);

export { server };
