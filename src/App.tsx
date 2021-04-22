import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import Sign from './components/Sign/Sign';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import ArticlePage from './components/ArticlePage/ArticlePage';
import fire from './fire';
import { Items } from './components/types';

export enum Routes {
  MAIN = '/',
  PROFILE = '/profile',
  SIGN = '/sign',
  ARTICLE = '/article',
};

const App = () => {
  const [loading, setLoadingStatus] = useState<boolean>(true);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [articleItems, setArticleItems] = useState<Items | undefined>();

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
              <Main user={user} setArticleItems={setArticleItems} />
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
            <Route path={Routes.ARTICLE}>
              {user 
                ? <ArticlePage articleItems={articleItems} />
                : <Redirect to={Routes.SIGN} />
              }
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
};

export default App;
