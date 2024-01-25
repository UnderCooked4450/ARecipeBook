import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializedAPP({
  apiKey: process.env.ANGULAR_APP_FIREBASE_API_KEY,
  authDomain: process.env.ANGULAR_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.ANGULAR_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.ANGULAR_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.ANGULAR_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.ANGULAR_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app