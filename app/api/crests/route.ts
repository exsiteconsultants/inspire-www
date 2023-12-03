import { list as listBlobs } from '@vercel/blob'

const crestImagePrefix = 'images/crests'

export async function updateBlobs() {
  // Get a list of the blobs in the images/crests folder
  const { blobs } = await listBlobs({ prefix: crestImagePrefix })

  return Response.json(blobs)
}
