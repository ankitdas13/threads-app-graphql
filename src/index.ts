import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http"
import { prismaClient } from "./lib/db";

interface User {
    newUser: {
        firtName: string;
        lastName: string;
        email: string;
        password: string;
    }
}

async function init() {
    const app = express()
    const PORT = process.env.PORT || 4000
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: `
          type Query {
            hello:String
            say(name: String): String
          }
          
          type Mutation {
            createUser(newUser: InputUser!): Boolean
          }

          input InputUser {
            firtName: String!
            lastName: String!
            email: String!
            password: String!
            salt: String! 
          }
        `,
        resolvers: {
            Query: {
                hello: () => "Hello i am graphql",
                say: (_, { name }: { name: string }) => `Hey ${name} how are you`
            },
            Mutation: {
                createUser: async (_, { newUser }: User) => {
                    const { firtName, lastName, email, password } = newUser
                    await prismaClient.user.create({
                        data: {
                          firtName,
                          lastName,
                          email,
                          password,
                          salt : "testing_salt"
                        }
                    })
                    return true
                }
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(express.json())
    app.use(
        '/graphql',
        expressMiddleware(server),
    );

    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
}

init()
