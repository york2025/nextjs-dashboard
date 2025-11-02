export async function GET(request: Request) {
    return Response.json({ message: (await request.text()).toString() })
}