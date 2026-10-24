import { google, drive_v3 } from 'googleapis'
import { authorizationService } from './authorizationService'
import { createReadStream } from 'fs'
//import { toolsService } from './toolsService'

export type ResponseFormat = 'files' | 'folders' | 'all'

export interface FilesInMainFolderOptions {
  choice?: ResponseFormat
}

export class DriverService {
  private FOLDER_NAME = 'GameBackups'
  private DATA_FILE_NAME = 'userData.json'

  private async getDriverClient(): Promise<drive_v3.Drive> {
    const authClietn = await authorizationService.checkToken()
    if (!authClietn) throw new Error(`Error missing authorized user`)
    return google.drive({ version: 'v3', auth: authClietn })
  }

  async getOrCreateAppFolder(): Promise<string> {
    const driver = await this.getDriverClient()
    const searchResponse = await driver.files.list({
      q: `name = '${this.FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive'
    })

    const existingFiles = searchResponse.data.files

    if (existingFiles && existingFiles.length > 0) {
      const folderId = existingFiles[0].id!
      return folderId
    }

    console.log(`Missing main folder...\nCreating folder ${this.FOLDER_NAME}`)

    const fileMetadata = {
      name: this.FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder'
    }

    const folderResponse = await driver.files.create({
      requestBody: fileMetadata,
      fields: 'id, name'
    })

    if (!folderResponse.data.id) {
      throw new Error(
        `Google Drive API created folder '${this.FOLDER_NAME}', but did not return an id`
      )
    }

    console.log(`Folder created successfully!`)
    return folderResponse.data.id
  }

  async readJsonFile<T>(fileId: string): Promise<T> {
    try {
      const drive = await this.getDriverClient()
      const response = await drive.files.get({
        fileId: fileId,
        alt: 'media'
      })

      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
      return data as T
    } catch (err) {
      throw new Error(`Failed to read file [${fileId}] from Google Drive:\n${err}`)
    }
  }

  async getOrCreateDataFile(): Promise<string> {
    const driver = await this.getDriverClient()
    const mainFolderId = await this.getOrCreateAppFolder()
    const searchResponse = await driver.files.list({
      q: `'${mainFolderId}' in parents and name = '${this.DATA_FILE_NAME}' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive'
    })

    const files = searchResponse.data.files
    if (files && files.length > 0 && files[0].id) {
      console.log(`Found existing ${this.FOLDER_NAME}: ${files[0].id}`)
      return files[0].id
    }

    console.log(`File ${this.DATA_FILE_NAME} not found. Creating...`)

    const createResponse = await driver.files.create({
      requestBody: {
        name: this.DATA_FILE_NAME,
        parents: [mainFolderId],
        mimeType: 'application/json'
      },
      media: {
        mimeType: 'application/json',
        body: JSON.stringify([], null, 2)
      },
      fields: 'id'
    })

    if (!createResponse.data.id) {
      throw new Error(`Failed to get ID for newly created ${this.DATA_FILE_NAME}`)
    }

    console.log(`Created new ${this.DATA_FILE_NAME}`)
    return createResponse.data.id
  }

  async updateJsonFile<T>(fileId: string, data: T): Promise<void> {
    const driver = await this.getDriverClient()
    const jsonContent = JSON.stringify(data, null, 2)

    await driver.files.update({
      fileId: fileId,
      media: {
        mimeType: 'application/json',
        body: jsonContent
      },
      fields: 'id, name, modifiedTime'
    })
    console.log(`UserData successfully updated`)
  }

  async uploadFileToFolder(
    parentFolderId: string,
    filePath: string,
    fileName: string
  ): Promise<string> {
    const drive = await this.getDriverClient()
    const fileMetadata = {
      name: fileName,
      parents: [parentFolderId]
    }

    const media = {
      mimeType: 'application/octet-stream',
      body: createReadStream(filePath) //filePath
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name'
    })

    if (!response.data.id) {
      throw new Error(`Error while working with ${fileName}\n`)
    }
    //console.log(`File ${fileName} successfully uploaded!`) 
    return response.data.id
  }

  async uploadToMainFolder(fileName: string): Promise<boolean> {
    const folderId = await this.getOrCreateAppFolder()
    if (!folderId) {
      console.error(`Missing folder SaveBackupperI ID:`)
      return false
    }
    const fileId = await this.uploadFileToFolder(folderId, 'укажи путь нормальный', fileName)
    return fileId !== null
  }

  async deleteMainFolder(): Promise<boolean> {
    try {
      const folderId = await this.getOrCreateAppFolder()
      if (!folderId) {
        console.error(`Missing folder SaveBackupperI ID:`)
        return false
      }

      const drive = await this.getDriverClient()

      await drive.files.update({
        fileId: folderId,
        requestBody: {
          trashed: true
        }
      })
      console.log(`Target moved to trash bin on Google disk`)
      return true
    } catch (err) {
      console.error(`Error while moving target to trash bin\n`, err)
      return false
    }
  }

  async filesInSubFolder(folderId: string): Promise<drive_v3.Schema$File[]> {
    //console.log('folder ID:', folderId)
    const drive = await this.getDriverClient()

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id)',
      orderBy: 'createdTime desc',
      spaces: 'drive'
    })
    if (!response.data.files) {
      throw new Error(`Error reading subFolder files`)
    }
    //console.log('FIles: ', response.data.files)
    return response.data.files
  }

  async folderFilesInfo(folderId: string): Promise<drive_v3.Schema$File[]> {
    //console.log('folder ID:', folderId)
    const drive = await this.getDriverClient()

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, mimeType, createdTime)',
      orderBy: 'createdTime desc',
      spaces: 'drive'
    })
    if (!response.data.files) {
      throw new Error(`Error reading subFolder files`)
    }
    //console.log('FIles: ', response.data.files)
    return response.data.files
  }

  async deleteInDrive(fileId: string): Promise<void> {
    const drive = await this.getDriverClient()

    await drive.files
      .update({
        fileId: fileId,
        requestBody: {
          trashed: true
        }
      })
      .catch((err) => {
        console.error(`Error while moving target to trash bin\n`, err)
      })
  }

  // async filesInMainFolder({ choice = 'all' }: FilesInMainFolderOptions = {}): Promise<
  //   drive_v3.Schema$File[]
  // > {
  //   try {
  //     const folderId = await this.getOrCreateAppFolder()
  //     if (!folderId) {
  //       console.error(`Missing folder SaveBackupper ID:`)
  //       return []
  //     }

  //     const drive = await this.getDriverClient()

  //     const selectResponse = (): string => {
  //       switch (choice) {
  //         case 'files':
  //           return `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`
  //         case 'folders':
  //           return `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  //         default:
  //           return `'${folderId}' in parents and trashed = false`
  //       }
  //     }

  //     const response = await drive.files.list({
  //       q: selectResponse(),
  //       fields: 'files(id, name)', //, mimeType, createdTime
  //       orderBy: 'createdTime desc',
  //       spaces: 'drive'
  //     })

  //     //console.log('FIles: ', response.data.files)
  //     return response.data.files || []
  //   } catch (err) {
  //     console.error(`Error while reading main folder:\n`, err)
  //     return []
  //   }
  // }

  // async textFile(textInfo: string): Promise<boolean> {
  //   const folderId = await this.getOrCreateAppFolder()
  //   if (!folderId) {
  //     console.error(`Missing folder SaveBackupperI ID:`)
  //     return false
  //   }

  //   const drive = await this.getDriverClient()

  //   const fileMetadata = {
  //     name: 'notes.txt',
  //     parents: [folderId]
  //   }

  //   const media = {
  //     mimeType: 'text/plain',
  //     body: `${textInfo}`
  //   }

  //   await drive.files.create({
  //     requestBody: fileMetadata,
  //     media: media
  //   })

  //   return true
  // }

  async createSubFolder(parentFolderId: string, folderName: string): Promise<string> {
    const drive = await this.getDriverClient()

    const searchResponse = await drive.files.list({
      q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive'
    })

    const existingFolders = searchResponse.data.files
    if (existingFolders && existingFolders.length > 0) {
      const folderId = existingFolders[0].id
      if (!folderId) {
        throw new Error(`Folder ${folderName} was found, but it has no id`)
      }
      return folderId
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id, name'
    })

    if (!response.data.id) {
      throw new Error(`Error while creating sub folder:\n${folderName}`)
    }
    console.log(`Sub Folder ${folderName} successfully created!`)
    return response.data.id
  }
}

export const driverSerivice = new DriverService()
