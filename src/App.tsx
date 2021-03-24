import './App.scss';
import { useEffect, useState, FC } from 'react';
import Sign from './components/Sign/Sign';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import fire from './fire';
import Profile from './components/Profile/Profile';

const App: FC = () => {
  const [user, setUser] = useState<any>();
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setHasAccount(true);
      } else {
        setUser({});
      } ;
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
        <Route path="/main" component={Main}></Route>
        <Route
          path="/sign"
          component={() =>
             <Sign 
              hasAccount={hasAccount}
              setHasAccount={setHasAccount} 
             />}
        ></Route>
        <Route 
          path="/profile" 
          component={() => 
          <Profile 
            setUser={setUser} 
          />
        }>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
