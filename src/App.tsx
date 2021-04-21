import './App.scss';
import { useEffect, useState, FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import Sign from './components/Sign/Sign';
import fire from './fire';

const App: FC = () => {
  const [user, setUser] = useState<any>(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged(setUser);
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header user={user} />
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
