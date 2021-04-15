import './App.scss';
import { useEffect, useState, FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import fire from './fire';
import firebase from 'firebase';
import Sign from './components/Sign/Sign';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';

export const enum Routes {
  MAIN = '/',
  PROFILE = '/profile',
  SIGN = '/sign',
};

const App: FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null | undefined>(null)

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) =>{
      if (user) {
        setUser(fire.auth().currentUser);
        setUserAvatar(fire.auth().currentUser?.photoURL);
      } else {
        setUser(null);
      }
    })
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
          userAvatar={userAvatar}
        />
        <Route exact path={Routes.MAIN}>
          <Main />
        </Route>
        <Route path={Routes.SIGN}>
          <Sign />
        </Route>
        <Route path={Routes.PROFILE}>
          <Profile setUser={setUser} setUserAvatar={setUserAvatar} />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
