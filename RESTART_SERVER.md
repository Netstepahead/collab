# How to Restart Development Server

## Quick Steps

### If Server is Running

1. **Stop the server**: 
   - Go to the terminal where `npm run dev` is running
   - Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
   - Wait for it to stop completely

2. **Start it again**:
   ```bash
   npm run dev
   ```

### If Server is Not Running

Just start it:
```bash
npm run dev
```

## Full Process

1. **Open Terminal/Command Prompt**
   - In VS Code/Cursor: Press `` Ctrl + ` `` (backtick) to open integrated terminal
   - Or open PowerShell/Command Prompt separately

2. **Navigate to project directory** (if not already there):
   ```bash
   cd C:\Projects\Collab
   ```

3. **Stop existing server** (if running):
   - Press `Ctrl + C` in the terminal where server is running

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Wait for it to start**:
   - You'll see: "Ready in X seconds"
   - Server will be at: `http://localhost:3000`

## Why Restart?

After adding environment variables (like `GOOGLE_CLIENT_ID`), you need to restart so the server picks up the new values.

## Troubleshooting

### "Port 3000 is already in use"
- Another process is using port 3000
- Find and stop it, or use a different port:
  ```bash
  npm run dev -- -p 3001
  ```

### "Command not found: npm"
- Node.js is not installed or not in PATH
- Install Node.js from nodejs.org

### Server won't start
- Check for errors in terminal
- Make sure you're in the project directory
- Try deleting `node_modules` and reinstalling:
  ```bash
  rm -r node_modules
  npm install
  npm run dev
  ```

## Quick Commands

- **Start**: `npm run dev`
- **Stop**: `Ctrl + C`
- **Restart**: Stop (`Ctrl + C`) then Start (`npm run dev`)
