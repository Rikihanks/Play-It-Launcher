const { app, BrowserWindow, ipcMain, IpcMessageEvent, remote } = require('electron')
let exec = null;
let ids = [];
const VDF = require('vdf-parser');

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



}


function getSteamAppIdsFromInstallDirectory(steamDir) {
	let instDirectory = steamDir + "\\steamapps";
	const fs = require('fs');

	addGameIds(fs, instDirectory);

	let libraries = checkIfMultipleLibraries(instDirectory, fs);


	if(libraries.length > 0) {
		libraries.forEach(library => {
			addGameIds(fs, library.replace("\\\\", "\\").concat("\\steamapps"))
		})
	}

	ids.forEach(id => console.log('id: ', id + " \n"))
}

function addGameIds(fs, instDirectory) {
	console.log(instDirectory);
	fs.readdirSync(instDirectory).forEach(file => {
		if (file.startsWith("appmanifest_")) {
			var matches = file.match(/(\d+)/);
			if (matches) {
				ids.push(matches[0]);
			}
		}
	});
}

function checkIfMultipleLibraries(instDirectory, fs) {
	libraries = [];
	var data = fs.readFileSync(instDirectory+'\\libraryfolders.vdf', 'utf8');

	var parsed = VDF.parse(data.toString(), true);

	for (var [key, value] of Object.entries(parsed.LibraryFolders)) {
		if (key != "TimeNextStatsReport" && key != "ContentStatsID") {
			libraries.push(value)
		}
	}

	return libraries;
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

//openfile
ipcMain.on('openFile', (event, path) => {

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

ipcMain.on('addSteamGames', (event, path) => {

	getSteamAppIdsFromInstallDirectory(path);

	ids.splice(ids.indexOf('228980'), 1);

	event.sender.send('steamAppIds', ids);
});


