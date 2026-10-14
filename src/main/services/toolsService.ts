import { app } from 'electron'
import { readFile, writeFile, access, rm, readdir } from 'fs/promises'
import { join } from 'path'

export class ToolsService {
  getFilePath(fileName: string): string {
    return join(app.getPath('userData'), fileName)
  }

  async getFiles<T>(path: string): Promise<T | null> {
    try {
      const bufferData = await readdir(path)
      return bufferData as T
    } catch (err) {
      console.log(`Error in tools service: \n${err}`)
      return null
    }
  }

  async readMyFile<T>(fileName: string, isToken: boolean = false): Promise<T | null> {
    try {
      const filePath = this.getFilePath(fileName)
      if (isToken) {
        const bufferData = await readFile(filePath)
        return bufferData as T
      }
      const fileData = await readFile(filePath, 'utf-8')
      return JSON.parse(fileData) as T
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async writeFile(fileName: string, data: unknown, isToken: boolean = false): Promise<boolean> {
    try {
      const filePath = join(app.getPath('userData'), fileName)
      if (isToken) {
        await writeFile(filePath, data as Buffer)
        return true
      }
      const contetn = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      await writeFile(filePath, contetn, 'utf-8')
      return true
    } catch (err) {
      console.error(`❌Error writing: ${err}`)
      return false
    }
  }

  async exists(fileName: string, silent: boolean = true): Promise<boolean | null> {
    try {
      const filePath = join(app.getPath('userData'), fileName)
      await access(filePath)
      return true
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        if (!silent) {
          console.log(`❌ Cant access file : ${fileName}\n${err}`)
        }
        return false
      }
      console.log(`Error checking existence of file ${fileName}`, err)
      throw err
    }
  }

  async deleteFile(fileName: string): Promise<boolean | null> {
    try {
      const filePath = join(app.getPath('userData'), fileName)
      await rm(filePath, { recursive: true })
      return true
    } catch (err) {
      console.log(`❌ Error deleting file : ${fileName}\n${err}`)
      return null
    }
  }
}

export const toolsService = new ToolsService()
