const { ipcRenderer } = require("electron");
console.log('1. webview preload load success!!!')
ipcRenderer.on("ping", () => {
  console.log('2. ipcRenderer.on("ping")','event triggered')
  console.log('3. ipcRenderer.sendToHost("pong-channel")')
  ipcRenderer.sendToHost('pong-channel','args that from webview-preload.js');
});