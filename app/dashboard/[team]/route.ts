import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ team: string }> }) {
    const { team } = await params
    return Response.json({ team })
}

