const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchHTML: (url) => ipcRenderer.invoke('fetch-html', url)
});
