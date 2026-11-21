import { BrowserWindow, dialog, shell } from 'electron'
import path from 'path'

export class SystemFolders {
  async openSystemFolders(): Promise<string | null> {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    const options: Electron.OpenDialogOptions = {
      title: 'Select backup folder',
      properties: ['openDirectory', 'dontAddToRecent']
    }
    const result = focusedWindow
      ? await dialog.showOpenDialog(focusedWindow, options)
      : await dialog.showOpenDialog(options)

    if (result.canceled || result.filePaths.length === 0) {
      return null
    }
    return result.filePaths[0]
  }

  async openFolder(folderPath: string): Promise<void> {
    if (!folderPath || folderPath.trim() === '') {
      throw new Error('Folder path is empty')
    }
    const cleanPath = path.normalize(folderPath)
    const errorMessage = await shell.openPath(cleanPath)
    if (errorMessage) {
      throw new Error(`Failed to open folder ${cleanPath}: ${errorMessage}`)
    }
  }
}

export const systemFoldresServise = new SystemFolders()
