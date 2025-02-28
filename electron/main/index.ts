// main.js
import path from 'path'
import { Menu, Tray } from 'electron'
import  { app, BrowserWindow }  from 'electron'

// 初始化数据库handler
import { dbInit } from "./dbInit";
import dotenv  from 'dotenv'
import { getDirname } from './utils';
import './auto-update/index'
import logger from './logger'
const __dirname = getDirname(import.meta.url)

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname,'../../', envFile) });
/**
 * 根目录 asar资源目录，dist、dist-electron都是在此目录下
 * electron-builder中files字段配置的文件都会放入此目录
 */
const rootDir = path.join(__dirname, '../../')
// html打包后的dist目录，在assr下
const electronDist = path.join(__dirname, '../../dist')
// 打包后preload目录
const preloadDir = path.join(__dirname, '../preload')

let mainWindow;
const createWindow = () => {
  const iconPath = path.join(rootDir, './assets/icon/tray.png')

   mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    icon: iconPath,
    // 隐藏顶部bar，隐藏后需自定义关闭，隐藏等按钮
    // titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(preloadDir, 'index.mjs'),
      sandbox: false,
      nodeIntegration: false,  // 关闭 nodeIntegration（更安全）
      contextIsolation: true,  // 启用 contextIsolation
    }
  })
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.resolve(electronDist, './index.html'))
  }
  // 顶部菜单栏
  Menu.setApplicationMenu(null)
  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async () => {
  logger.info('main init')
  await dbInit()
  createWindow()
  addTray()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/**
 * 所有窗口被关闭时, mac上试用command + Q 关闭窗口
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

// 系统托盘
let tray
/**
 * 添加系统托盘
 */
const addTray = () => {
  const iconPath = path.join(rootDir, './assets/icon/tray.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', click: () => app.quit() },
  ])
  tray.setToolTip('测试应用')
  tray.setContextMenu(contextMenu)
}
