const express = require("express");
const cors = require("cors");
const { firestore, realtimeDB } = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * ADD USER (Firestore + Cache)
 */
app.post("/user", async (req, res) => {
  const { id, name, email } = req.body;

  try {
    // 1. Save to Firestore
    await firestore.collection("users").doc(id).set({
      name,
      email
    });

    // 2. Save to Firebase cache
    await realtimeDB.ref("userCache/" + id).set({
      name,
      email
    });

    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

/**
 * GET USER (Cache → Firestore)
 */
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // 1. Check cache
    const snapshot = await realtimeDB
      .ref("userCache/" + userId)
      .once("value");

    if (snapshot.exists()) {
      console.log("From Firebase Cache");
      return res.json(snapshot.val());
    }

    // 2. Fetch from Firestore
    const doc = await firestore
      .collection("users")
      .doc(userId)
      .get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    const userData = doc.data();

    // 3. Store in cache
    await realtimeDB.ref("userCache/" + userId).set(userData);

    console.log("From Firestore");
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
