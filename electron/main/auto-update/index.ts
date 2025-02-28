import {  ipcMain } from 'electron'
import updater from 'electron-updater'
import { UPDATE_CHANNEL, UPDATE_CODE } from '../utils/constants'
const { autoUpdater } = updater
let webContents
// 开发环境下可检查更新， 仅测试时开启
autoUpdater.forceDevUpdateConfig = false
autoUpdater.autoDownload = false

autoUpdater.on('error', err => sendStatus(UPDATE_CODE.error, err.message))
// 开始检查更新
autoUpdater.on('checking-for-update', () => sendStatus(UPDATE_CODE.checking))
// 发现可更新数据时
autoUpdater.on('update-available', () => sendStatus(UPDATE_CODE.updateAvaible))
// 没有可更新数据时
autoUpdater.on('update-not-available', () => sendStatus(UPDATE_CODE.updateNotAvaible))
// 下载监听
autoUpdater.on('download-progress', p => sendStatus(UPDATE_CODE.downloadProgress, p))
// 下载完成
autoUpdater.on('update-downloaded', () => sendStatus(UPDATE_CODE.updateDownloaded))

// 状态推送方法, 会被渲染进程传入的回调函数替换
const sendStatus = (code, data?: any) => {
  webContents?.send?.(UPDATE_CHANNEL.MSG,  {code, data} )
}

ipcMain.on(UPDATE_CHANNEL.MSG, async (event, message) => {
  webContents = event.sender
})

// 修改地址
ipcMain.handle(UPDATE_CHANNEL.SET_URL, (e, url) => autoUpdater.setFeedURL(url))

// 执行更新检查
ipcMain.on(UPDATE_CHANNEL.CHECK_UPDATE, () => autoUpdater.checkForUpdates())

// 手动下载更新文件
ipcMain.on(UPDATE_CHANNEL.DOWNLOAD_UPDATE, async (e, data) => autoUpdater.downloadUpdate())

// 退出并安装
ipcMain.on(UPDATE_CHANNEL.EXIT_AND_INSTALL, () => autoUpdater.quitAndInstall())
