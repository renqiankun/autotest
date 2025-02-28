import { ipcRenderer } from 'electron'

export const logger = {
  error: (msg: any) => sendLoag('error', msg),
  warn: (msg: any) => sendLoag('warn', msg),
  info: (msg: any) => sendLoag('info', msg),
  verbose: (msg: any) => sendLoag('verbose', msg),
  debug: (msg: any) => sendLoag('debug', msg),
  silly: (msg: any) => sendLoag('silly', msg)
}

const sendLoag = async (level: string, msg: any) =>
  await ipcRenderer.send('__ELECTRON_LOG__', {
    // LogMessage-like object
    data: [msg],
    level: level,
    variables: { processType: 'renderer' }
    // ... some other optional fields like scope, logId and so on
  })
