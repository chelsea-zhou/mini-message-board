const db = require("../db/queries");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    const body = req.body;
    const hashedPw = await bcrypt.hash(body.password, 10);
    const createReq = {
        username: body.username,
        password: hashedPw
    }
    console.log(`usename is ${JSON.stringify(createReq)}`);
    await db.createUser(createReq);
    res.redirect('/');
}

async function getUserByName(req) {
    return await db.getUserByName(req);
}
async function getUserById(req) {
    return await db.getUserById(req);

}

async function joinClub(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    const body = req.body;
    if (body.passphrase === 'nonnis') {
        console.log(`user is ${JSON.stringify(req.user)}`);
        await db.updateUserStatus(req.user);
        res.redirect('/');
    } else {
        alert(`wrong pass phrase, guess again`);
    }
}
module.exports = {
    createUser,
    getUserByName,
    getUserById,
    joinClub
}