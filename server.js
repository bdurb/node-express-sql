const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const server = express();
server.use(cors());
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

server.get('/posts/:id', (req, res) => {
  const {id} = req.params
  db.findById(id)
  .then(post => {
    if (post.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.json(post)
    }
  })
  .catch(() => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})

server.post('/posts', (req, res) => {
  const post = req.body
  if (!post.title || !post.contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db.insert(post)
  .then(post => {
      res.status(201).json(post)
  })
  .catch(() => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})

server.delete('/posts/:id', (req, res) => {
  const {id} = req.params
  db.remove(id)
  .then(response => {
    console.log(response)
    if (response !== 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.json(removed)
    }
  })
  .catch(() => {
    res.status(500).json({ error: "The post could not be removed" })
  })
})

server.put('/posts/:id', (req, res) => {
  const {id} = req.params
  const edits = req.body
  if (!edits.title || !edits.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  db.update(id, edits)
  .then(post => {
    if (!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      db.findById(id)
      .then(post => {
        res.status(200).json(post)
      })
    }
  })
  .catch(() => {
    res.status(500).json({ error: "The post information could not be modified." })
  })
})



server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})


