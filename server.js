const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

const PORT = 8000



server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})


