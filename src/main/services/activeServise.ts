import path from 'path'
import { toolsService } from './toolsService'
import os from 'os'

export class ActiveServise {
  FOR_DELETION = ['.zip', `userData.json`]
  async zipEraser(): Promise<string> {
    const tempPath = os.tmpdir()
    const files: string[] = (await toolsService.getFiles(tempPath)) || []
    const backups = files.filter(
      (file) => file === `userData.json` || file.toLocaleLowerCase().endsWith('.zip')
    )
    if (!backups || backups.length === 0) return 'all working goooood'
    for (let i = 0; i < backups.length; i++) {
      const result = path.join(os.tmpdir(), backups[i])
      await toolsService.deleteFile(result)
    }
    return 'data deleted!'
  }
}

export const activeServise = new ActiveServise()
