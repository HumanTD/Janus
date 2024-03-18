import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const email = body.email;
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        resume: true,
      },
    });

    const res = await fetch("https://bac7-136-233-9-98.ngrok-free.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume: user?.resume }),
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message });
  }
}
