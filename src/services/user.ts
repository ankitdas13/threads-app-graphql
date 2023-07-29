import { prismaClient } from "../lib/db";
import crypto from "crypto"
import JWT from "jsonwebtoken"

export interface createUserPayload {
  firtName: string;
  lastName: string;
  email: string;
  password: string;
}

const secretToken = "secret1234"

class UserService {
  public static createUser(payload: createUserPayload) {
    const { firtName, lastName, email, password } = payload

    const salt = crypto.randomBytes(32).toString("hex")
    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest("hex")

    return prismaClient.user.create({
      data: {
        firtName,
        lastName,
        email,
        password: hashedPassword,
        salt: salt
      }
    })
  }

  public static async getUserToken(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) throw new Error("user not found")

    const salt = user?.salt || ""
    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')
    
    if (hashedPassword !== user?.password) {
      throw new Error("user or password is incorrect")
    }

    const token = JWT.sign(JSON.stringify({
      "id": user.id,
      "email": user.email
    }),secretToken)

    return token
  }

  public static getUserIdDetail(id: string){
    return prismaClient.user.findUnique({ where: {id}})
  }
  
  public static decodeJWTToken(token:string){
    return JWT.verify(token, secretToken)
  }
}

export default UserService