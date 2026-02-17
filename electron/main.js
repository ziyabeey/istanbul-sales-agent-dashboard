import { app, BrowserWindow, shell, session } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Local Server for Google OAuth compatibility ---
function startLocalServer() {
    const server = http.createServer((req, res) => {
        // Handle URL and query params
        const url = new URL(req.url, 'http://localhost:3000');
        let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
        let filePath = path.join(__dirname, '../dist', pathname);

        // Correct path for packaged app
        if (!fs.existsSync(filePath)) {
            // Fallback to index.html for SPA routing if file not found
            filePath = path.join(__dirname, '../dist/index.html');
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }

            const ext = path.extname(filePath);
            const contentTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.json': 'application/json'
            };

            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
            res.end(data);
        });
    });

    // Try to listen on 3000 as configured in Google Cloud
    server.listen(3000, '127.0.0.1', () => {
        console.log('Production server running on http://localhost:3000');
    });

    return server;
}
let localServer = null;
// --- End Local Server ---

// Disable hardware acceleration for stability on some systems
// app.disableHardwareAcceleration();

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 680,
        title: 'Istanbul AI Sales Agent',
        icon: path.join(__dirname, '../build/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webSecurity: true,
        },
        titleBarStyle: 'hiddenInset',
        trafficLightPosition: { x: 16, y: 16 },
        backgroundColor: '#f8fafc',
        show: false, // Show after ready-to-show to avoid flicker
    });

    // Content Security Policy & Header Interception
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [
                    "default-src 'self' http://localhost:3000; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com; " +
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                    "font-src 'self' https://fonts.gstatic.com; " +
                    "img-src 'self' data: blob: https:; " +
                    "connect-src 'self' http://localhost:3000 https://*.googleapis.com https://*.google.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebase.com https://generativelanguage.googleapis.com https://firestore.googleapis.com; " +
                    "frame-src 'self' https://accounts.google.com; " +
                    "object-src 'none';"
                ]
            }
        });
    });

    // Trick Google into thinking we are running on localhost:3000
    session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: ['https://accounts.google.com/*', 'https://*.googleapis.com/*'] },
        (details, callback) => {
            details.requestHeaders['Origin'] = 'http://localhost:3000';
            details.requestHeaders['Referer'] = 'http://localhost:3000/';
            callback({ requestHeaders: details.requestHeaders });
        }
    );

    // Load the app
    if (process.env.VITE_DEV_SERVER_URL) {
        // Development: load from Vite dev server
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
    } else {
        // Production: Start local server and load from localhost:3000
        if (!localServer) localServer = startLocalServer();
        mainWindow.loadURL('http://localhost:3000');
    }

    // Show window gracefully
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Open external links in browser instead of Electron
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Allow Google Auth popups to stay inside Electron
        if (url.includes('accounts.google.com')) {
            return {
                action: 'allow',
                overrideBrowserWindowOptions: {
                    webPreferences: {
                        // Allow Google to identify the window
                        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                }
            };
        }

        // Everything else opens in system browser
        if (url.startsWith('https://') || url.startsWith('http://')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

// macOS: Re-create window when dock icon is clicked
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
