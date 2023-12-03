import { list as listBlobs } from '@vercel/blob'

export const dynamic = 'force-dynamic' // defaults to force-static

const crestImagePrefix = 'images/crests'

export async function GET() {
  // Get a list of the blobs in the images/crests folder
  const { blobs } = await listBlobs({ prefix: crestImagePrefix })

  return Response.json(blobs)
}
