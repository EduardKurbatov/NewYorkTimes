import './App.scss';
import { useEffect, useState, FC } from 'react';
import Sign from './components/Sign/Sign';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import fire from './fire';
import Profile from './components/Profile/Profile';


const App: FC = () => {
  const [user, setUser] = useState<any>(null);
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  const authListener = () => {
    fire.auth().onAuthStateChanged(setUser);
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
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
};

export default App;
