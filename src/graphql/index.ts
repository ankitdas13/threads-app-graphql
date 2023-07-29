import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { User } from './users';

async function createApolloGraphqlServer(){
    const gqlServer = new ApolloServer({
        typeDefs : `
         type Query {
            ${User.queries}
         }
         type Mutation {
            ${User.mutations}
         }

         ${User.typeDefs}
        `,
        resolvers : {
           Query : {
             ...User.resolvers.queries
           },
           Mutation : {
             ...User.resolvers.mutations
           }
        }
    })

    await gqlServer.start()

    return gqlServer
}

export default createApolloGraphqlServer