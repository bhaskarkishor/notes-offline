import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


var config = {
    apiKey: "AIzaSyBPLfeYdbA4jIsJ6vgba6DQ7TflScbybTU",
    authDomain: "notes-redefined.firebaseapp.com",
    databaseURL: "https://notes-redefined.firebaseio.com",
    projectId: "notes-redefined",
    storageBucket: "notes-redefined.appspot.com",
    messagingSenderId: "630429435814",
    appId: "1:630429435814:web:c71b6385b9a91c2324b167"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
//export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase