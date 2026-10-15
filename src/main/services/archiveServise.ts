import AdmZip from 'adm-zip'

export class ArchiveServise {
  async createZipArchive(sourceDir: string, outZipPath: string): Promise<boolean> {
    try {
      const zip = new AdmZip()
      zip.addLocalFolder(sourceDir, '')
      await zip.writeZipPromise(outZipPath)
      console.log(`Archive successfully created at: ${outZipPath}`)
      return true
    } catch (err) {
      console.error(`Error while creating ZipArchive:\n${err}`)
      return false
    }
  }

  async extractZipArchive(zipPath: string, targetDir: string): Promise<boolean> {
    try {
      const zip = new AdmZip(zipPath)
      zip.extractAllTo(targetDir, true)
      console.log(`Archive successfully extracting in ${targetDir}`)
      return true
    } catch (err) {
      console.error(`Error while extracting archive ${zipPath}:\n${err}`)
      return false
    }
  }
}

export const archiveServise = new ArchiveServise()
