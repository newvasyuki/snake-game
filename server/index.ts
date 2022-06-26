import fs from 'fs';
import https from 'https';
import path from 'path';
import { app } from './server';

const httpsOptions = {
  key: null,
  cert: null,
};

if (app.get('env') === 'development') {
  httpsOptions.key = fs.readFileSync(path.resolve(__dirname, '../../../ssl/key.pem'));
  httpsOptions.cert = fs.readFileSync(path.resolve(__dirname, '../../../ssl/cert.pem'));
}

const port = parseInt(process.env.PORT, 10) || 5000;

https.createServer(httpsOptions, app).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is started on port: ${port}`);
});
