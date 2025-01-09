import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"email"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"password"
                }
            },
            async authorize(credentials){
                // return {id:"1",name:"admin",role:"admin"}
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials");
                }

                try {
                    await connectDB();
                    const user = await User.findOne({email:credentials.email});
                    if(!user){
                        throw new Error(`No User Found with ${credentials?.email}`);
                    }
                   const isValidUser =  await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if(!isValidUser){
                        throw new Error("Invalid Password");
                    }
                    return {
                        id:user._id.toString(),
                        email:user.email,
                        role:user.role
                    }

                } catch (error) {
                    console.error("Auth Error: ",error);
                    throw error;
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token,user }) {
            if (user) {             
              token.id = user.id 
              token.role = user.role
            }
            return token
          },
          
        async session({ session, token }) {
           // through the session we are accessing the token
            session.user.id = token.id as string;
            session.user.role = token.role as string;

            
            return session;
          }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:30*24*60*60,
    },
    secret:process.env.NEXTAUTH_SECRET
}