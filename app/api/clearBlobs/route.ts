import { del, list } from '@vercel/blob'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function DELETE() {
  console.log('------------------- CLEARING BLOBS -------------------')
  const { blobs } = await list({ prefix: 'images/crests' })

  for (const blob of blobs) {
    await del(blob.url)
  }
  console.log('------------------- CLEARING BLOBS:DONE -------------------')
  return Response.json({ ok: true })
}
