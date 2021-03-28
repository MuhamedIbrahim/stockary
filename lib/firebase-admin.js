import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKeyId: process.env.ADMIN_PRIVATE_KEY_ID,
      privateKey: process.env.ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  });
}

export const adminDB = admin.firestore();
