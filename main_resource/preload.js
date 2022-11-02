const { contextBridge, ipcRenderer } = require("electron");
const _process = process;
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  sendToHost: (channel, data) => {
    ipcRenderer.sendToHost(channel, data);
  },
  sendSync: (channel, data) => {
    return ipcRenderer.sendSync(channel, data);
  },
  sendTo(webContentsId, channel, ...args) {
    return ipcRenderer.sendTo(webContentsId, channel, ...args);
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
  },
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, _process.versions[dependency]);
  }
});

console.log(Array)
