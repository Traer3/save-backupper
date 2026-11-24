import AdmZip from 'adm-zip'
import path from 'path'

export class ArchiveServise {
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
}

export const archiveServise = new ArchiveServise()
