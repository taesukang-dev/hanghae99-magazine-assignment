import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAhYo8Q7SwOtGigzzq_4PgvyD1-f5LDh70',
  authDomain: 'week-5-basic.firebaseapp.com',
  projectId: 'week-5-basic',
  storageBucket: 'week-5-basic.appspot.com',
  messagingSenderId: '38756492107',
  appId: '1:38756492107:web:bcad3ebf5fa409b56bfece',
  measurementId: 'G-C0LV9TZX9B',
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const auth = firebase.auth()
const apiKey = firebaseConfig.apiKey

export { firestore, auth, apiKey }
