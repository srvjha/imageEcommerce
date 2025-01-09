import { connectDB } from "@/lib/db";
import Product from "@/models/Product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:NextRequest,
    props:{params:Promise<{id:string}>}
){
    try {
        const {id} = await props.params;
        await connectDB();
        const product = await Product.findById(id).lean();
        if (!product) {
            return NextResponse.json({error:"No Product Found"},{status:404})
        }
        return NextResponse.json({product},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Failed to fetch the product"},{status:500})
    }
}