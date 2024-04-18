import { ApolloServer } from "@apollo/server";
import {expressMiddleware as middleware} from "@apollo/server/express4";
import express from 'express';
import {authMiddleware,login} from './auth.js';
import cors from 'cors';
import { resolvers } from "./resolvers.js";
import {readFile} from 'node:fs/promises';

const PORT=9000;
const app=express();
app.use(cors(),express.json(),authMiddleware);

app.post('/login',login);

const typeDefs=await readFile('./schema.graphql','utf8');
const server=new ApolloServer({typeDefs,resolvers});
await server.start();
app.use('/graphql',middleware(server));
app.listen({port:PORT},()=>{
    console.log(` Servidor corriendo en http://localhost:${PORT}/graphql`);
});


