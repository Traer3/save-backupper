import { app } from 'electron'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export class ToolsService {
  // исправить эту дрочь , но возможность выбирать любую папку в корне проекта
  private getFilePath(fileName: string): string {
    return join(app.getPath('userData'), fileName)
  }

  async readMyFile<T>(fileName: string): Promise<T | null> {
    try {
      const filePath = this.getFilePath(fileName)
      const fileData = await readFile(filePath, 'utf-8')
      return JSON.parse(fileData) as T
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async writeFile(fileName: string, data: unknown): Promise<boolean> {
    try {
      const filePath = join(app.getPath('userData'), fileName)
      const contetn = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      await writeFile(filePath, contetn, 'utf-8')
      return true
    } catch (err) {
      console.error(`❌Error writing: ${err}`)
      return false
    }
  }
}

export const toolsService = new ToolsService()

/*
exports.exists = async (path,silent = true) => {
    try {
        await fsPromises.access(path);
        return true;
    } catch (err) {
        if(err.code === 'ENOENT'){
            if(!silent){
                console.log(`❌ Cant access file : ${path}\n${err.message}`)
            }
            return false;
        }
        console.log("Error checking existens of: ", path);
        throw err;
    }
};
exports.deleteFile = async (filePath) => {
    try {
        await fsPromises.rm(filePath, { recursive: true })
        return true;
    } catch (err) {
        console.log(`❌ Error deleting file : ${filePath}\n${err}`)
    }
};
*/
