const {pool} = require("./pool");

async function createUser(req) {
    console.log(`req is ${JSON.stringify(req)}`);
    const sql = `INSERT INTO users (username, password, status) VALUES ($1, $2, $3)`
    // default membership = false
    await pool.query(sql, [req.username, req.password, false]);
}

async function getUserByName(req) {
    const username = req.username;
    const {rows} = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return rows[0];
}

async function getUserById(req) {
    const id = req.id;
    const {rows} = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return rows[0];
}

async function createNewMessage(req) {
    const sql = `
        INSERT INTO messages (user_id, message_text, date) VALUES ($1, $2, $3)
    `
    await pool.query(sql, [req.user_id, req.message_text, req.date]);
}

async function getMessages(req) {
    const sql = ` SELECT * FROM messages;`
    const {rows} = await pool.query(sql);
    return rows;
}

async function getMessagesWithAuthor() {
    const sql = `
    SELECT messages.*, users.id, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id;`
    const {rows} = await pool.query(sql);
    return rows;
}

async function updateUserStatus(user) {
    const user_id = user.id;
    const sql = `UPDATE users SET status = $1 WHERE id=$2`;
    await pool.query(sql, [true, user_id]);
}

module.exports = {
    createUser,
    getUserByName,
    getUserById,
    updateUserStatus,
    createNewMessage,
    getMessages,
    getMessagesWithAuthor
}