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
    res.render('index', {messages, user: req.user});
}
module.exports = {
    createNewMessage,
    getMessages
}