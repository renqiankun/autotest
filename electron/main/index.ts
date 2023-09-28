// main.js
import path from 'path'
import { mainInitHand } from './dbServices/dbServicesInit'
import { Menu } from 'electron'
const { app, BrowserWindow } = require('electron')

let preloadDir = path.join(__dirname, '../preload')
let distDir: string = process.env.DIST || ''
// Modules to control application life and create native browser window

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    center :true,
    titleBarStyle :'hidden',
    webPreferences: {
      preload: path.join(preloadDir, 'index.js')
    }
  })
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.resolve(distDir, 'index.html'))
  }
  Menu.setApplicationMenu(null)
  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  mainInitHand()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
