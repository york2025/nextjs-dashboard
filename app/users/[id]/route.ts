import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log({ id });
    console.log(id)

    const cookieStore = await cookies()
    const token = cookieStore.get('token');
    console.log({ token })

    const headerList = await headers()
    console.log({ headerListentries: headerList.entries() })
    return new Response(JSON.stringify({ id }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            "Set-Cookie": token?.value || "test",
        },
    });
}


