import fire from '../fire';

export const initLogin = (email, password) => {
    return fire.auth().signInWithEmailAndPassword(email, password);
  }

  export const createUser = (email, password) => {
    return fire.auth().createUserWithEmailAndPassword(email, password);
  }


  // const authListener = () => {
//     fire.auth().onAuthStateChanged((user) => {
//       if(user) {
//         cleearInputs();
//       } 
//     })
//   };

// useEffect(() => {
//   console.log('rerender');
// })

// const cleearInputs = () => {
//     setEmail("");
//     setPassword("");
// };