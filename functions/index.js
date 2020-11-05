const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const fireStore = admin.firestore();

const Collections = {
  Game: fireStore.collection("Game"),
};

// https://firebase.google.com/docs/functions/write-firebase-functions
// https://firebase.google.com/docs/reference/js/firebase.firestore

exports.createGame = functions.https.onRequest(async (req, res) => {
  const { payload } = req.body.variables;

  const docRef = await Collections.Game.add(payload);

  const docSnapshot = await docRef.get();
  res.status(200).send(docSnapshot.data());
});

/**
 * @todo
 * - pagination
 * - filter
 * - sorter
 */
exports.getGame = functions.https.onRequest(async (req, res) => {
  const games = [];
  const listSnapshot = await Collections.Game.get();

  listSnapshot.forEach((doc) => games.push(doc.data()));

  res.status(200).send(games);
});

exports.updateGame = functions.https.onRequest(async (req, res) => {
  const { id, payload } = req.body.variables;

  await Collections.Game.doc(id).update(payload);
  const docSnapshot = await Collections.Game.doc(id).get()

  res.status(200).send(docSnapshot.data());
});

exports.removeGame = functions.https.onRequest(async (req, res) => {
  const { id } = req.body.variables;

  await Collections.Game.doc(id).delete();

  res.status(200).send('successfully remove');
});
