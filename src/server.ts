import * as express from 'express';
import { router } from './router';
import * as logger from './logger';
import * as fs from './fs';
import * as utils from './utils';

export function start(): void {
  let app: express.Application = express();

  initMorose().then(() => {
    app.use(router);
    app.listen(10000, () => logger.info(`server running on port 10000`));
  });
}

function initMorose(): Promise<null> {
  let root = utils.getRootDir();

  return fs.exists(root).then(exists => {
    if (exists) {
      return Promise.resolve();
    } else {
      return fs.ensureDirectory(root)
        .then(() => utils.writeInitConfig())
        .then(() => fs.ensureDirectory(utils.getFilePath('packages')))
        .then(() => fs.ensureDirectory(utils.getFilePath('logs')))
        .then(() => fs.ensureDirectory(utils.getFilePath('tarballs')))
        .then(() => logger.info(`morose successfully initialized.`));
    }
  });
}