import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(_request: NextRequest) {
    redirect('https://nextjs.org')
}