import path from 'path'
import fs from 'fs/promises'

export async function readPostsJson(): Promise<unknown> {
  const filePath = path.join(process.cwd(), 'content', 'posts.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}
