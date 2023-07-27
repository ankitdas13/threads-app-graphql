import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http"


async function init(){
    const app = express()
    const PORT = process.env.PORT || 4000
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: `
          type Query {
            hello:String
            say(name: String): String
          }
        `,
        resolvers: {
            Query:{
                hello : ()=> "Hello i am graphql",
                say: (_,{name}:{name: string}) => `Hey ${name} how are you`
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
