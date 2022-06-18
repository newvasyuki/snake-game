import { app } from './server';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Application is started on port:', port);
});
