const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      date: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      date: new Date()
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
    const newMessage = {
        text: body.message,
        user: body.user,
        date: new Date()
    };
    messages.push(newMessage);
    res.redirect("/");
})


app.listen(3000)


