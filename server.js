// @flow
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:33923be5-e0df-4fd8-95cc-53f75e6edc39',
  key: 'a60593cd-ce94-4e9c-bfed-62c17f34504b:crNzUvhCIOIrSWYZpO0CakiRNeyhj6zu2YTNgUOK/ck='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const {username} = req.body;
  
  chatkit.createUser({
    name: username,
    id: username
  })
  .then((() => res.sendStatus(201)))
  .catch(error => {
    if (error.error === 'services/chatkit/user_already_exists') {
      res.sendStatus(200)
    } else {
      res.status(error.status).json(error);
    }
  });
});

app.post('/authenticate', (req, res) => {
  // const {grant_type} = req.body;
  // res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id}));
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  res.status(authData.status)
     .send(authData.body);
});


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
