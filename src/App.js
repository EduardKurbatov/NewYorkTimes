import './App.scss';
import { useEffect, useState } from 'react';
import Sign from './components/Sign/Sign';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import fire from './fire';
import Profile from './components/Profile/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged called');
      if(user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setHasAccount(true);
        // console.log('user', user.photoURL);
      } else {
        setUser(null);
      } ;
    });
  };

  useEffect(() => {
    authListener();
  }, []);
  
  useEffect(() => {}, [user])  

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          user={user} 
          setUser={setUser}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount} 
        />
        <Route path="/main" component={Main}></Route>
        <Route
          path="/sign"
          component={() =>
             <Sign 
             user={user} 
             setUser={setUser} 
             />}
        ></Route>
        <Route 
          path="/profile" 
          component={() => 
          <Profile 
            user={user} 
            setUser={setUser} 
          />}>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
