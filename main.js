const { app, BrowserWindow, ipcMain, IpcMessageEvent, remote } = require('electron')
let exec = null;

 function createWindow() {
	// Create the browser window. 
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		center: true,
		resizable: false,
		frame: false,
		transparent: true,
		icon: __dirname + '/iconplayit.png',
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInSubFrames: true
		},
	})
	win.removeMenu();

	// Load the index.html of the app 
	// From the dist folder which is created 
	// After running the build command 
	win.loadFile('dist/RitoLauncher/index.html')

	// Open the DevTools. 
	win.webContents.openDevTools()

	/*var readStream = fs.readFileSync('C:\\Program Files (x86)\\Steam\\appcache\\appinfo.vdf');
	const shortcuts = readVdf(readStream);
	console.log(shortcuts); // output below;*/


		/*var data = fs.readFileSync('C:\\Program Files (x86)\\Steam\\appcache\\appinfo.vdf', 'utf8');

		console.log(data.toString());
		var parsed = VDF.parse(data.toString());
		console.log(parsed);    */
	 
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

//minimize
ipcMain.on('openFile', (event, path) => {
	/*if (exec == null) {
		exec = require('child_process').exec;
	}

	exec("%SystemRoot%\\explorer.exe \"" + path + "\"", (error, stdout, stderr) => {
		// Callback will be called when process exits..
		if (error) {
			console.error(`An error occurred: `, error);
		} else {
			console.log(`stdout:`, stdout);
			console.log(`stderr:`, stderr);
		}
	});*/



	var child = require('child_process').execFile;
	var executablePath = path;

	child(executablePath, function (err, data) {
		if (err) {
			console.error(err);
			return;
		}

		console.log(data.toString());
		
		event.sender.send('success', 'success');
	});
});