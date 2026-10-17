import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

const distPath = path.resolve(__dirname, 'dist');

// Serve static assets from Vite production build
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback to index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>J&T Express AUH South West Hub</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc;">
          <div style="text-align: center; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2>Initializing J&T Express Hub...</h2>
            <p>Please refresh this page in a few seconds.</p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`J&T Express AUH South West Hub server running on http://0.0.0.0:${PORT}`);
});
