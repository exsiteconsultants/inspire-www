import { del, list } from '@vercel/blob'

export async function DELETE(request: Request) {
  const { blobs } = await list({ prefix: 'images/crests' })

  for (const blob of blobs) {
    await del(blob.url)
  }

  return Response.json({ ok: true })
}
