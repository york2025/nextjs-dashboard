import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ team: string }> }) {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    console.log(searchParams); // { name: 'york', age: '30' }
    return Response.json(searchParams);
}


// export async function GET() {
//   return new Response(
//     `<?xml version="1.0" encoding="UTF-8" ?>
// <rss version="2.0">

// <channel>
//   <title>Next.js Documentation</title>
//   <link>https://nextjs.org/docs</link>
//   <description>The React Framework for the Web</description>
// </channel>

// </rss>`,
//     {
//       headers: {
//         'Content-Type': 'text/xml',
//       },
//     }
//   )
// }

export async function POST(request: NextRequest) {
    const body = await request.json()
    return Response.json({ body })
}