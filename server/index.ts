/* eslint-disable no-console */
import fs from 'fs';
import https from 'https';
import path from 'path';
import { app } from './server';

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../ssl/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../../ssl/cert.pem')),
};

const port = parseInt(process.env.PORT, 10) || 5000;
// test 1 2 3

if (app.get('env') === 'development' && parseInt(process.env.SKIP_FORUM_AUTH, 10)) {
  // создаем приложение без авторизации ручек форума
  app.listen(port, () => {
    console.log(`Application is started on port: ${port}`);
  });
} else {
  // для авторизации ручек форума надо ранать его на https с self-signed certificate,
  // чтобы пробрасывались куки яндекса внутрь сервера
  https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Application is started on port: ${port}`);
  });
}
