import firebase from "firebase"

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};




  
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider};

export default auth