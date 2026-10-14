import fs from 'fs'
import archiver from 'archiver'

export class ArchiverService {
  async createZipArchive(sourceDir: string, outZipPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(outZipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })
      
    })
  }
}
