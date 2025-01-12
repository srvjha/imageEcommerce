import { connectDB } from "@/lib/db";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
      const{email,password}  = await request.json();
      if(!email || !password){
        return NextResponse.json(
        {error:"Email and password fields are required"},
        {status:400}
    )
      }
      await connectDB();
      const existingUser = await User.findOne({email});
      if(existingUser){
        return NextResponse.json(
            {error:"Email is already registered"},
            {status:400}
        )
      }
      await User.create({
        email,
        password,
        role:"admin"
      })
      return NextResponse.json(
        {message:"User registered successfully"},
        {status:201}
        )
    } catch (error) {
        console.error("Registration error: ",error)
        return NextResponse.json(
            {message:"Fail to register a user"},
            {status:501}
            )
    }
}