import pg from "pg";

const client = new pg.Pool();
client.connect();

export {client};