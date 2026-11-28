import AdmZip from 'adm-zip'
import path from 'path'
import { app } from 'electron'

export class ArchiveService {
  async createZipArchive(sourceDir: string, outZipPath: string): Promise<void> {
    const zip = new AdmZip()
    zip.addLocalFolder(sourceDir, '')
    await zip.writeZipPromise(outZipPath)
    //console.log(`Archive successfully created at: ${outZipPath}`)
  }

  async extractZipArchive(zipPath: string, targetDir: string): Promise<void> {
    const zip = new AdmZip(zipPath)
    zip.extractAllTo(targetDir, true)
    console.log(`Archive successfully extracting in ${targetDir}`)
  }

  async createZipFromFiles(filePaths: string[], outZipPath: string): Promise<void> {
    const zip = new AdmZip()
    for (const filePath of filePaths) {
      zip.addLocalFile(filePath, '', path.basename(filePath))
    }
    await zip.writeZipPromise(outZipPath)
  }

  async createOfflineZip(sourceDir: string, gameName: string): Promise<void> {
    const cleanDesktopPath = path.join(app.getPath('desktop'), `${gameName}.zip`)
    const cleanPath = path.normalize(sourceDir)
    await this.createZipArchive(cleanPath, cleanDesktopPath)
  }
}

export const archiveService = new ArchiveService()
