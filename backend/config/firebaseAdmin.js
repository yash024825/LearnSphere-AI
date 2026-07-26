const admin = require("firebase-admin");

// Service account credentials come from three separate env vars (rather than
// one JSON blob) because most hosts don't handle multi-line JSON env values
// well. Generate these from: Firebase Console -> Project settings ->
// Service accounts -> Generate new private key.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Private key is stored with literal "\n" in the env var; convert back
      // to real newlines or the key will fail to parse.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

module.exports = admin;