import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const locations = [
    "united-states",
    "canada",
    "mexico",
    "mumbai",
    "india",
    "australia",
    "united-kingdom",
    "germany",
    "france",
  ];
  try {
    const randomLocationIndex = Math.floor(Math.random() * locations.length);
    const res = await fetch(`https://a856-136-233-9-98.ngrok-free.app?location=${randomLocationIndex}`, {
        method: "GET"
    });
    const data = await res.json();

    return NextResponse.json({ success: true, jobs: data });
    
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
