import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_PROJECT_ID) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Replace escaped newlines if provided in an environment variable
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        } else {
            // Mock initialization for Next.js build time
            admin.initializeApp({ projectId: "demo-project-build" });
        }
    } catch (error: any) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export const db = admin.firestore();
