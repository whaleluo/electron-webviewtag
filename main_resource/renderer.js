console.log("preload load success!!!");
// https://www.electronjs.org/docs/latest/api/webview-tag#event-ipc-message
// Fired when the guest page has sent an asynchronous message to embedder page.
// With sendToHost method and ipc-message event you can communicate between guest page and embedder page:

// In embedder page.

// const webview = document.querySelector("webview");
const webview = document.createElement("webview");
webview.id="testview"
webview.setAttribute(
    'webpreferences',
    "contextIsolation=yes,sandbox=no,webSecurity=no,nodeIntegration=false"
)
webview.setAttribute('src','./webview/webview.html')
webview.setAttribute('preload',"./webview/webview-preload.js")
webview.setAttribute('style',"display:inline-flex; width:640px; height:680px")

webview.addEventListener("dom-ready", () => {
  webview.openDevTools();
  // ipcRenderer.sendToHost('pong-channel','abc');
  webview.addEventListener("ipc-message", (event) => {
    console.log("from-embed-page : ipc-message",event);
    // Prints "pong" pong-channel','abc
  });
});

document.body.appendChild(webview)

setTimeout(() => {
    console.log('after 5s, webview.send("ping")')
    webview.send("ping");
//    send webview renderer process
//    Send an asynchronous message to renderer process via channel
//   See webContents.send for examples.
}, 5000);


