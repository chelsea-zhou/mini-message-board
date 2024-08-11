const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost", // or wherever the db is hosted
    user: "chenshuzhou",
    database: "message_board",
    password: "Ulquiorra4!",
    port: 5432 // The default port
  });

module.exports = {
    pool
}