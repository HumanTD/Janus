import sendMail from "@/lib/send-mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const email = body.email;
  const content = body.content;
  
  try {
    const subject = "Welcome to our platform";
    const text = "We are excited to have you on board";

    await sendMail(email, subject, content);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
