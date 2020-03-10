const port = 3003;
// const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port, () => console.log(`BACKEND is running on port ${port}.`));
