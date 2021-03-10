import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5KO_0olranmJR294vocEPoVj4m_DGpdM",
  authDomain: "newyorktimesn.firebaseapp.com",
  databaseURL: "https://newyorktimesn-default-rtdb.firebaseio.com",
  projectId: "newyorktimesn",
  storageBucket: "newyorktimesn.appspot.com",
  messagingSenderId: "581730704822",
  appId: "1:581730704822:web:55dc1fac07b08e86ee3517"
};
   
const fire = firebase.initializeApp(firebaseConfig);

export default fire
