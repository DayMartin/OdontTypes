import express from 'express';
import { router } from './routes/router';
import 'dotenv/config';
import { connectToDatabase } from './database/connection';
import cors from "cors";

const server = express();

server.use(express.json());
server.use(router);
// Configurando o middleware CORS
server.use(cors());


//DB conect
connectToDatabase()

// Routes
server.use("/api", router);

export { server };
