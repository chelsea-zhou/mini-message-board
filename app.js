const express = require('express');
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require("./controllers/userController");
const messageController = require("./controllers/messageController");


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const user = await userController.getUserByName({username});
            if(!user) {
                return done(null, false, {message: "incorrect username"});
            }
            const isEqualPw = await bcrypt.compare(password, user.password);
            if (!isEqualPw) {
                return done(null, false, {message: "incorrect password"});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
    const user = await userController.getUserById({id});
    done(null, user);
    } catch(err) {
        done(err);
    }
});

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

app.get('/sign-up', (req, res)=> {
    res.render('signup');
});

app.post('/sign-up', userController.createUser);

app.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

app.post('/login', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'})
);


app.get('/', messageController.getMessages);

app.get('/join-club', (req, res) => {
    res.render('joinClub');
});

app.post('/join-club', userController.joinClub);

app.get('/newMessage', (req, res) => {
    res.render("newMessage");
});

app.post('/newMessage', messageController.createNewMessage);

app.get('/messageDetail/:id', (req, res) => {
    const id = req.params.id;
    const filteredMessages = messages.filter((message) => message.id == id);
    if (filteredMessages.length >0) {
        res.render("messageDetail", {message: filteredMessages[0]});
    }
});


app.listen(8000)


