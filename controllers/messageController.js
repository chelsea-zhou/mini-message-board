const db = require("../db/queries");
async function createNewMessage(req, res) {
    const body = req.body;
    const user_id = req.user.id;
    const createReq = {
        user_id,
        message_text: body.message,
        date: new Date()
    }
    await db.createNewMessage(createReq);
    res.redirect('/');

}

async function getMessages(req, res) {
    // depend on if user has membership, join with another table
    let messages = null;
    if (req.user && req.user.status) {
        console.log(`show author for messages`);
        messages =  await db.getMessagesWithAuthor();
    } else {
        messages = await db.getMessages(req);
    }
    console.log(`messages: ${JSON.stringify(messages)}`);
    res.render('index', {messages, user: req.user});
}

async function getMessage(req, res) {
    const id = req.params.id;
    const message = await db.getMessage({id});
    console.log(`message is ${JSON.stringify(message)}`);
    res.render('messageDetail', {message, user: req.user})
}
module.exports = {
    createNewMessage,
    getMessages,
    getMessage
}