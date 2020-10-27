import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBAm4pLPU2tw3tlIRMhC0xLVQcKd16i0fk",
    authDomain: "whatsapp-mern-8e5a7.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-8e5a7.firebaseio.com",
    projectId: "whatsapp-mern-8e5a7",
    storageBucket: "whatsapp-mern-8e5a7.appspot.com",
    messagingSenderId: "9194508907",
    appId: "1:9194508907:web:51046feed9e59ea210172e",
    measurementId: "G-HEMCFTPKGF"
  };

  
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider};

export default auth