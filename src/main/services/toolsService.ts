import { app } from 'electron'
import { readFile } from 'fs/promises'
import { join } from 'path'

export class ToolsService {
  private getFilePath(fileName: string): string {
    const fullPath = join(app.getPath('userData'), fileName)
    console.log('File path : ', fullPath)
    return fullPath
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
}

//Экспортируем экземпляр сервиса
export const toolsService = new ToolsService()

/*
exports.writeInfo = async (filePath, data) => {
    try {
        return await fsPromises.writeFile(filePath, data, 'utf-8');
    } catch (err) {
        return console.error(`❌Error writing: ${err.message}`)
    }
};

exports.readMyFile = async (filePath) => {
    try {
        return await fsPromises.readFile(filePath, 'utf-8');
    } catch (err) {
        console.error(`❌Error reading file ${filePath} `, err.message)
        return null;
    }
}

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
