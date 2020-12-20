const { app, BrowserWindow, ipcMain, IpcMessageEvent, remote } = require('electron') 

function createWindow () { 
	app.userAgentFallback = "Chrome";
	// Create the browser window. 
	const win = new BrowserWindow({ 
		width: 1454, 
		height: 832, 
		center: true, 
		resizable: false,		
		frame: false,
		transparent: true, 
		webPreferences: { 
			nodeIntegration: true,
			nativeWindowOpen: true,
			preload: __dirname + '/preload.js'
		},
	}) 
	win.removeMenu();

	// Load the index.html of the app 
	// From the dist folder which is created 
	// After running the build command 
	win.loadFile('dist/RitoLauncher/index.html', {userAgent: 'Chrome'}) 

	// Open the DevTools. 
	//win.webContents.openDevTools() 
} 


// This method will be called when Electron has finished 
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs. 
// This method is equivalent to 'app.on('ready', function())' 
app.whenReady().then(createWindow) 

// Quit when all windows are closed. 
app.on('window-all-closed', () => { 
// On macOS it is common for applications and their 
// menu bar to stay active until the user quits 
// explicitly with Cmd + Q 
if (process.platform !== 'darwin') { 
	app.quit() 
} 
}) 

app.on('activate', () => { 
// On macOS it's common to re-create a window in the 
// app when the dock icon is clicked and there are 
// no other windows open. 
	if (BrowserWindow.getAllWindows().length === 0) { 
		createWindow() 
	} 
}) 

// In this file, you can include the rest of your app's 
// specific main process code. You can also put them in 
// separate files and require them here. 



// LISTENERS FOR ANGULAR METHODS

//close program
ipcMain.on('close', (event) => {
	BrowserWindow.getFocusedWindow().destroy()
	app.quit() 
});


//minimize
ipcMain.on('minimize', (event) => {
	BrowserWindow.getFocusedWindow().minimize();
});