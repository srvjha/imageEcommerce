import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error:"Unauthorized"},
                {status:401}
            )
        }
        await connectDB();
      const orders =   await Order.find({userId:session.user.id})
        .populate({
            path: "productId",
            select:"name imageUrl",
            options:{
                strictPopulate:false
            }
        })
        .sort({createdAt: -1})
        .lean()

        if(!orders){
            return NextResponse.json(
                {error:"No orders found"},
                {status:404}
                )
        }
        return NextResponse.json({orders},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"Something went wrong"},
            {status:500}
            )
    }
}