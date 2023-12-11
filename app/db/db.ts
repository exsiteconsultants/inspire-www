import { NeonDialect } from 'kysely-neon'
import { Kysely } from 'kysely'
import { neonConfig } from '@neondatabase/serverless'
import { DB } from './types'

let db: Kysely<DB>

export function getDB() {
  if (!db) {
    // if we're running locally add custom WS proxy
    if (process.env.LOCAL_WS) {
      // Set the WebSocket proxy to work with the local instance
      neonConfig.wsProxy = (host) => `${host}:5433/v1`
      // Disable all authentication and encryption
      neonConfig.useSecureWebSocket = false
      neonConfig.pipelineTLS = false
      neonConfig.pipelineConnect = false
    }

    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL is not set')
    }

    db = new Kysely<DB>({
      dialect: new NeonDialect({
        connectionString: process.env.POSTGRES_URL,
      }),
    })
  }

  return db
}
