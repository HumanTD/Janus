import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const resumeUrl = body.resumeUrl;
  const userEmail = body.userEmail;

  try {
    const prisma = new PrismaClient();
    // store the resume url in the user's profile
    const user = await prisma.user.update({
      where: {
       email: userEmail
      },
      data: {
        resume: resumeUrl,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Resume stored successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
