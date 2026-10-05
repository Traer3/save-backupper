// // чекаем инструменты

// import { ipcMain } from 'electron'
// import { toolsService } from '../services/toolsService'

// export function testTools(): void {
//   ipcMain.handle('read-json', async (_, fileName: string) => {
//     const FileInfo = await toolsService.readMyFile(fileName)
//     console.log('FileInfo: ', FileInfo)
//     return FileInfo
//   })
// }
