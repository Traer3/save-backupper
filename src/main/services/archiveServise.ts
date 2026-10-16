import AdmZip from 'adm-zip'

export class ArchiveServise {
  async createZipArchive(sourceDir: string, outZipPath: string): Promise<void> {
    const zip = new AdmZip()
    zip.addLocalFolder(sourceDir, '')
    await zip.writeZipPromise(outZipPath)
    console.log(`Archive successfully created at: ${outZipPath}`)
  }

  async extractZipArchive(zipPath: string, targetDir: string): Promise<void> {
    const zip = new AdmZip(zipPath)
    zip.extractAllTo(targetDir, true)
    console.log(`Archive successfully extracting in ${targetDir}`)
  }
}

export const archiveServise = new ArchiveServise()
