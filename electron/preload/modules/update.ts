import { ipcRenderer } from 'electron'
import { UPDATE_CHANNEL } from '../../main/utils/constants'

export const update = {
  // 监听状态变化
  onUpdateMsg: callback => {
    ipcRenderer.invoke(UPDATE_CHANNEL.MSG)
    ipcRenderer.on(UPDATE_CHANNEL.MSG, (_, response) => callback(response))
  },
  // 设置更新地址
  setUrl: async (url: string) => await ipcRenderer.invoke(UPDATE_CHANNEL.SET_URL, url),
  // 触发更新检查
  checkUpdate: () => ipcRenderer.invoke(UPDATE_CHANNEL.CHECK_UPDATE),
  // 手动开始下载 ‌
  startDownload: () => ipcRenderer.invoke(UPDATE_CHANNEL.DOWNLOAD_UPDATE),
  // 退出并安装更新
  quitAndInstall: () => ipcRenderer.invoke(UPDATE_CHANNEL.EXIT_AND_INSTALL)
}
