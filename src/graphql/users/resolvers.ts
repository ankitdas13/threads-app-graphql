import UserService, { createUserPayload } from "../../services/user"

const queries = {
    getUserToken : async (_:any,{email,password}:{email:string,password:string}) => {
        const resp = await UserService.getUserToken(email,password)
        return resp
    },

    getCurrentLoggedInUser : async(_:any,param:any,context:any)=>{
      if(context && context.user){
        const user = await UserService.getUserIdDetail(context.user.id)
        return user
      }
    }
}

const mutations = {
    createUser : async (_:any,{payload}:{payload: createUserPayload}) => {
        const {firtName, lastName, email, password} = payload
        await UserService.createUser({
            firtName,
            lastName,
            email,
            password
        })

        return `${firtName} user is created`
    }
}

export const resolvers = {queries, mutations}