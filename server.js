const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

const PORT = 8000

server.get('/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.json(posts)
  })
  .catch(() => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})


