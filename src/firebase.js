import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDHZq-r2drggewfx7iOidgTaEuaxK2Jqh8",
  authDomain: "books-73d12.firebaseapp.com",
  databaseURL: "https://books-73d12.firebaseio.com",
  projectId: "books-73d12",
  storageBucket: "books-73d12.appspot.com",
  messagingSenderId: "605116499632",
  appId: "1:605116499632:web:f8f187ff7180df55"

}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()

export default firestore  