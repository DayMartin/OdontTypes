import supertest from 'supertest';
import { server } from '../src/Server/Server'


export const testServer = supertest(server);