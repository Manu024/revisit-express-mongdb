const mongoClient = require("mongodb").MongoClient;
const dbName = "test";
const dbUrl = "mongodb://127.0.0.1:27017/";


let db;
const connectToDatabase = async () => {
  const mongo = await mongoClient.connect(dbUrl);
  db = mongo.db(dbName);
};

const getDatabase = () => {
  if (!db) {
    console.log("Database wasn't connected still");
  }
  return db;
};

module.exports = {
  connectToDatabase: connectToDatabase,
  getDatabase: getDatabase
}