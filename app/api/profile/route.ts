import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const userEmail = body.userEmail;

  try {
    const prisma = new PrismaClient();
    // store the resume url in the user's profile
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "User found",
      user: user,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
