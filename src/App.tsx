import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import Sign from './components/Sign/Sign';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import fire from './fire';

export enum Routes {
  MAIN = '/',
  PROFILE = '/profile',
  SIGN = '/sign',
};

const App = () => {
  const [loading, setLoadingStatus] = useState<boolean>(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
      setLoadingStatus(false);
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return loading
    ? <h2>Loading...</h2>
    : <div className="app">
        <BrowserRouter>
          <Header user={user} />
          <Switch>
            <Route exact path={Routes.MAIN}>
              <Main />
            </Route>
            <Route path={Routes.SIGN}>
              <Sign />
            </Route>
            <Route path={Routes.PROFILE}>
              {user
                ? <Profile setUser={setUser} />
                : <Redirect to={Routes.SIGN} />
              }
            </Route>
            <Route>
              <Redirect to={Routes.MAIN}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
};

export default App;
