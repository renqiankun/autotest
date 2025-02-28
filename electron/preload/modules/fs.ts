import fs from 'fs'
/**
 * 也可以ipcRenderer发送给主进程处理
 * 此处抛出部分接口，方便快速开发
 */
export const fsProxy = {
  readFile: fs.readFile,
  writeFile: fs.writeFile,
  appendFile: fs.appendFile,
  mkdir: fs.mkdir,
  readdir: fs.readdir,
  stat: fs.stat,
  rmdir: fs.rmdir,
  rename: fs.rename,
  copyFile: fs.copyFile,
  access: fs.access,
  chmod: fs.chmod,
  chown: fs.chown,
  fstat: fs.fstat
}
