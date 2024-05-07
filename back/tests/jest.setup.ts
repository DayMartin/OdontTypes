import supertest from 'supertest';
import { server } from '../src/Server/Server'
import { beforeAll } from '@jest/globals'; 

export const testServer = supertest(server);