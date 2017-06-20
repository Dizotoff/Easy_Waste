const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var express = require('express');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/text', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/text', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/text/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
