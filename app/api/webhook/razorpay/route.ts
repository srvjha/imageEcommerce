import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order.model";
import nodemailer from "nodemailer"

export async function POST(req :NextRequest){
    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
        .update(body)
        .digest("hex");

        if (signature !== expectedSignature) {
            return  NextResponse.json({error:"Invalid signature"}, { status: 401 });
        }

        const event = JSON.parse(body);
        console.log("event: ",event)
        await connectDB();

        if(event.event === "payment.captured"){
            const payment = event.payload.payment.entity;
            console.log("payment: ",payment);
            
            const order = await Order.findOneAndUpdate(
                {razorpay_order_id: payment.order_id},
                {
                    razorpayPayment:payment.id,
                    status:"completed",
                }
            ).populate([
                {path:"productId",select:"name"},
                {path:"userId",select:"email"},
            ])

            if(order){
               const transporter = nodemailer.createTransport({
                service:"sandbox.smtp.mailtrap.io",
                port:2525,
                auth:{
                    user:process.env.MAILTRAP_USER,
                    pass:process.env.MAILTRAP_PASS,
                    // add these to env file
                },
               });
               await transporter.sendMail({
                from: "info@saurav.com",
                to: order.userId.email,
                subject: "Order Completed",
                text: `Your order ${order.productId.name} has been successfully placed`,

               });
            }
        }

        return NextResponse.json({message:"success"},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"Something went wrong"},
            {status:500}
        )
    }
}