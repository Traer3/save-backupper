import { app, shell, BrowserWindow, ipcMain, Tray, nativeImage, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { authorizationIps } from './ips/authorizationIps'
import { driverSeriviceIps } from './ips/driverSeriviceIps'
import { filesServiceIps } from './ips/filesServiceIps'
import { backupUploaderIps } from './ips/backupUploaderIps'
import { getInfoIps } from './ips/getInfoIps'
import { toolsIps } from './ips/toolsIps'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isQuitting = false

function showMainWindow(): void {
  if (!mainWindow) {
    createWindow()
    return
  }

  if (mainWindow.isMinimizable()) {
    mainWindow.restore()
  }

  mainWindow.show()
  mainWindow.focus()
}

function createTray(): void {
  if (tray) return

  const trayImage = nativeImage.createFromPath(icon).resize({ width: 16, height: 16 })
  tray = new Tray(trayImage)
  tray.setToolTip('Save Backupper')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => showMainWindow()
    },
    { type: 'separator' },
    {
      label: 'Exit',
      click: () => {
        isQuitting = true
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    if (!mainWindow) {
      createWindow()
      return
    }
    if (mainWindow.isVisible()) {
      mainWindow.focus()
    } else {
      showMainWindow()
    }
  })
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 350,
    height: 690,
    show: false,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2E346E',
      symbolColor: '#ffffff',
      height: 30
    },
    backgroundColor: '#2E346E',

    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow = win

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault()
      win.hide()
    }
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('ping', () => console.log('pong'))

  authorizationIps()
  driverSeriviceIps()
  filesServiceIps()

  createWindow()
  createTray()

  getInfoIps()
  backupUploaderIps()
  toolsIps()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('before-quit', () => {
  isQuitting = true
})

app.on('window-all-closed', () => {})
