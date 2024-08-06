const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

let counter = 0;

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      date: new Date(),
      id: 1
    },
    {
      text: "Hello World!",
      user: "Charles",
      date: new Date(),
      id: 2
    }
  ];
app.get('/', (req, res) => {
    res.render("index", { messages: messages });
});

app.get('/newMessage', (req, res) => {
    res.render("newMessage");
});

app.post('/newMessage', (req, res) => {
    const body = req.body;
    counter +=1;
    const newMessage = {
        text: body.message,
        user: body.user,
        date: new Date(),
        id: counter 
    };
    messages.push(newMessage);
    res.redirect("/");
});

app.get('/messageDetail/:id', (req, res) => {
    const id = req.params.id;
    const filteredMessages = messages.filter((message) => message.id == id);
    if (filteredMessages.length >0) {
        res.render("messageDetail", {message: filteredMessages[0]});
    }
});


app.listen(3000)


