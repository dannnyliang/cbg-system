const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Busboy = require("busboy");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./service-account-file.json");

const cors = require("cors")({ origin: true });
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// https://googleapis.dev/nodejs/storage/4.7.0/index.html
const bucket = admin.storage().bucket("cbg-system.appspot.com");

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

exports.getGame = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { id } = req.query;
    const docSnapshot = await Collections.Game.doc(id).get();

    res.status(200).send({
      ...docSnapshot.data(),
      id,
    });
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

exports.uploadFile = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { prefix = "others" } = req.query;
    const busboy = new Busboy({ headers: req.headers });

    let name;
    let filePath;
    let storageFile;

    // This code will process each file uploaded.
    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
      name = filename;
      filePath = `${prefix}/${uuidv4()}${path.extname(filename)}`;
      storageFile = bucket.file(filePath);

      const writeStream = storageFile.createWriteStream();
      writeStream.on("finish", () => {
        file.resume();
      });
      writeStream.on("error", (error) => {
        throw error;
      });
      file.on("error", (error) => writeStream.destroy(error));
      file.pipe(writeStream);
    });

    busboy.on("finish", async () => {
      const signedUrl = await storageFile.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });
      res.status(200).send({
        name,
        filePath,
        url: signedUrl[0],
      });
    });

    busboy.end(req.rawBody);
  });
});

exports.removeFile = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { filePath } = req.body.variables;

    await bucket.deleteFiles({
      prefix: filePath,
    });

    res.status(200).send("successfully remove");
  });
});
