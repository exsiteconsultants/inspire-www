import { GET as getLeague } from '@/app/api/fetchleague/route'
import { GET as getJplCup } from '@/app/api/fetchjplcup/route'
import { GET as getHampshireCup } from '@/app/api/fetchhampshirecup/route'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET() {
  await Promise.all([getLeague(), getJplCup(), getHampshireCup()])
  return Response.json({ result: 'success' })
}
