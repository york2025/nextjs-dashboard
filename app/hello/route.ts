import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{team: string}>}) {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    console.log(searchParams); // { name: 'york', age: '30' }
    return Response.json(searchParams);
}



export async function POST(request: NextRequest) {
    const body = await request.json()
    return Response.json(body)
}