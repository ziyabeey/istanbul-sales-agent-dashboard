import { NextResponse } from 'next/server'
import { oturumSil } from '@/lib/sessionManager'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  await oturumSil(response)
  return response
}
