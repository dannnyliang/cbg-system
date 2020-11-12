const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });
admin.initializeApp();

const fireStore = admin.firestore();

const Collections = {
  Game: fireStore.collection("Game"),
};

// https://firebase.google.com/docs/functions/write-firebase-functions
// https://firebase.google.com/docs/reference/js/firebase.firestore

exports.createGame = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { payload } = req.body.variables;

    const docRef = await Collections.Game.add(payload);

    const docSnapshot = await docRef.get();
    res.status(200).send(docSnapshot.data());
  });
});

/**
 * @todo
 * - pagination
 * - filter
 * - sorter
 */
exports.getGames = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const games = [];
    const listSnapshot = await Collections.Game.get();

    listSnapshot.forEach((doc) => {
      games.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    res.status(200).send(games);
  });
});

exports.updateGame = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { id, payload } = req.body.variables;

    await Collections.Game.doc(id).update(payload);
    const docSnapshot = await Collections.Game.doc(id).get();

    res.status(200).send(docSnapshot.data());
  });
});

exports.removeGame = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { id } = req.body.variables;

    await Collections.Game.doc(id).delete();

    res.status(200).send("successfully remove");
  });
});
