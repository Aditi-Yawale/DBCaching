const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dbcaching-default-rtdb.firebaseio.com"
});

const firestore = admin.firestore();      // MAIN DB
const realtimeDB = admin.database();       // CACHE

module.exports = { firestore, realtimeDB };
