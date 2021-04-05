import './App.scss';
import { useEffect, useState, FC } from 'react';
import Sign from './components/Sign/Sign';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import fire from './fire';
import Profile from './components/Profile/Profile';

const App: FC = () => {
  const [user, setUser] = useState<any>(null);
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setHasAccount(true);
      } else {
        setUser(null);
      }
    });
  };  

  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {}, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          user={user}
          setUser={setUser}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount} 
        />
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/sign">
          <Sign />
        </Route>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
