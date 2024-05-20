import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const routerLoader = (app) => {
  const modulesPath = path.join(__dirname, 'modules');

  fs.readdirSync(modulesPath).forEach(async (dir) => {
    const modulePath = path.join(modulesPath, dir);

    if (fs.statSync(modulePath).isDirectory) {
      const controllerPath = path.join(modulePath, `${dir}.controller.js`);

      if (fs.existsSync(controllerPath)) {
        // Convert the file path to a URL
        const controllerUrl = pathToFileURL(controllerPath).href;
        const controller = await import(controllerUrl);

        if (controller.default && typeof controller.default === 'function') {
          app.use(controller.default);
        }
      }
    }
  });
};
