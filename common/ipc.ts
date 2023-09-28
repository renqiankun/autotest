import { ipcRenderer } from "electron";
import { v4 as uuid } from "uuid";
interface config {
  timeout?: number;
  params: any;
  sid?: string;
}
/**
 * 渲染进程向主进程通信
 * @param channel 
 * @param params 
 * @param config 
 * @returns 
 */
export const ipcRendererReq = async (
  channel: string,
  params: any,
  config?: config
) => {
  let defaultConfig: config = {
    timeout: 5 * 1000,
    sid: uuid(),
    params: {},
    ...config,
  };
  // 渲染进程向主进程发送消息，同时监听主进程的恢复
  let renderRquest = new Promise((resolve) => {
    ipcRenderer.on(defaultConfig.sid!, (event, data: any) => {
      resolve(data);
    });
    ipcRenderer.send(channel, params);
  });

  let timer:any = null;
  let timeoutHand = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve({ code: 500, msg: "服务连接超时（-1）" });
      reject(new Error("连接超时"));
    }, defaultConfig.timeout);
  });

  let requestResult = Promise.race([renderRquest, timeoutHand]);
  try {
    let res = await requestResult;
    return res;
  } catch (error) {
    console.warn(
      `render channel ${channel} timeout, arg:${JSON.stringify(
        params
      )}, timeout:${defaultConfig.timeout}`
    );
  }finally{
    clearTimeout(timer)
    ipcRenderer.removeAllListeners(defaultConfig.sid!)
  }
};
