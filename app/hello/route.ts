export async function GET(request: Request) {
    console.log(request.url)
    const { searchParams } = new URL(request.url)
    const queryParams: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value
    }

    return Response.json(queryParams)
}

export async function POST(request: Request) {
    const body = await request.json()
    return Response.json(body)
}