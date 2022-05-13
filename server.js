const path = require('path');
const express = require('express');
const fallback =  require('express-history-api-fallback');

const app = express();
const root = path.join(__dirname, 'build');
app.use(express.static(root));
app.use(fallback('index.html', { root }));
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
