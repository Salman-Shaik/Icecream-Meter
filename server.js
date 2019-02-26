const http = require('http');
const path = require('path');
const app = require(path.resolve('app.js'));

const dataFileName = 'memberData.json';

app.initialize(dataFileName);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT);
console.log(`server listening at ${PORT}`);