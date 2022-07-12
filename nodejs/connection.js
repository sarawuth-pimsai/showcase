const mariadb = require("mariadb");
const { Client, Pool } = require("pg");
const { createClient } = require("redis");
const { MongoClient } = require("mongodb");
const ips = {
  redis: "172.27.0.3",
  mongo: "172.30.0.5",
  mariadb: "172.30.0.3",
  postgres: "172.30.0.4",
};
const mongoUrl = `mongodb://${ips.mongo}:27017`;
// redis.on("error", (error) => console.log({ error }));
const connectRedis = async () => {
  try {
    const conn = await createClient("6379", ips.redis);
    console.log({ conn });
  } catch (error) {
    console.log({ error });
  }
};
const connectMongoDB = async () => {
  try {
    const client = new MongoClient(mongoUrl);
    const conn = await client.connect();
    console.log({ conn });
  } catch (error) {
    console.log({ error });
  }
};
const poolPostgres = new Pool({
  user: "root",
  host: ips.postgres,
  password: "1234",
  database: "db",
  port: 5432,
});
const connectPostgres = async () => {
  let conn;
  try {
    conn = await poolPostgres.connect();
    console.log({ conn });
  } catch (error) {
    console.log({ error });
  }
};
const pool = mariadb.createPool({
  host: ips.mariadb,
  user: "root",
  password: "1234",
  connectionLimit: 5,
});
const connectMariadb = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log({ conn });
  } catch (error) {
    console.log({ error });
  }
};
connectRedis();
connectMongoDB();
connectMariadb();
connectPostgres();
console.log("start");
