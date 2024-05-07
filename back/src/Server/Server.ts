import express from 'express';
import { router } from './routes/router';
import 'dotenv/config';
import { connectToDatabase } from './database/connection';

const server = express();

server.use(express.json());
server.use(router);

//DB conect
connectToDatabase()

// Routes
server.use("/api", router);

export { server };
