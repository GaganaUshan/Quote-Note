const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWin, settingsWin, listWin;

function createMain(){
  mainWin = new BrowserWindow({
    width: 760,
    height: 420,
    minWidth: 520,
    minHeight: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  mainWin.loadFile(path.join(__dirname, 'index.html'));
}

function createSettings(){
  if(settingsWin && !settingsWin.isDestroyed()){
    settingsWin.focus();
    return;
  }
  settingsWin = new BrowserWindow({
    width: 520,
    height: 320,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  settingsWin.loadFile(path.join(__dirname, 'settings.html'));
  settingsWin.on('closed', ()=>{ settingsWin = null; });
}

function createList(){
  if(listWin && !listWin.isDestroyed()){
    listWin.focus();
    return;
  }
  listWin = new BrowserWindow({
    width: 520,
    height: 320,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  listWin.loadFile(path.join(__dirname, 'list.html'));
  listWin.on('closed', ()=>{ listWin = null; });
}

app.whenReady().then(()=>{
  createMain();

  ipcMain.on('open-settings', ()=> createSettings());
  ipcMain.on('open-list', ()=> createList());

  ipcMain.on('request-settings', (evt)=>{
    if(mainWin && !mainWin.isDestroyed()){
      mainWin.webContents.send('provide-settings', {});
    }
  });

  ipcMain.on('update-settings', (evt, data)=>{
    if(mainWin && !mainWin.isDestroyed()){
      mainWin.webContents.send('settings-updated', data);
      if(typeof data.alwaysOnTop === 'boolean'){
        mainWin.setAlwaysOnTop(data.alwaysOnTop);
      }
    }
    if(settingsWin && !settingsWin.isDestroyed()){
      settingsWin.webContents.send('settings-applied', data);
    }
  });

  ipcMain.on('sync-quotes', (evt, data)=>{
    // forward new quotes to main window and list window
    if(mainWin && !mainWin.isDestroyed()) mainWin.webContents.send('quotes-updated', data);
    if(listWin && !listWin.isDestroyed()) listWin.webContents.send('quotes-updated', data);
  });

  app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0) createMain();
  });
});

app.on('window-all-closed', function(){
  if(process.platform !== 'darwin') app.quit();
});
