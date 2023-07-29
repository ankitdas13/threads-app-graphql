import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http"
import { prismaClient } from "./lib/db";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";


const app = express()
const PORT = process.env.PORT || 4000

interface User {
    newUser: {
        firtName: string;
        lastName: string;
        email: string;
        password: string;
    }
}

async function init() {
    app.use(express.json())
    app.use('/graphql',expressMiddleware(await createApolloGraphqlServer(),{
        context : async({ req })=> {
            const token = req.headers["authorization"]
            try{
              const user = UserService.decodeJWTToken(token as string)
              return {user}
            }catch(e){
                return {}
            }
        }
    }));

    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
}


init()
