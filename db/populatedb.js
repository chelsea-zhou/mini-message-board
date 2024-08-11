#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 ),
   status VARCHAR ( 255 )
);`

const message_SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message_text VARCHAR ( 255 ),
    user_id INTEGER NOT NULL,
    date TIMESTAMP
);`
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://chenshuzhou:Ulquiorra4!@localhost:5432/message_board",
  });
  await client.connect();
  await client.query(message_SQL);
  await client.end();
  console.log("done");
}

main();
