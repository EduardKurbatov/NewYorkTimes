import './App.scss';
import { useEffect, useState, FC } from 'react';
import Sign from './components/Sign/Sign';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import fire from './fire';
import Profile from './components/Profile/Profile';
import ArticlePage from './components/ArticlePage/ArticlePage';

// TODO: insert this Enum to global navigation
export enum Routes {
  MAIN = '/',
  PROFILE = '/profile',
  SIGN = '/sign',
};

const App: FC = () => {
  const [user, setUser] = useState<object>({});
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [img, setImg] = useState<string>('');

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
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
  
  useEffect(() => {}, [user])  

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          setUser={setUser}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount} 
        />
        <Route
         path="/main"
         component={() => 
          <Main 
            hasAccount={hasAccount}
            title={title}
            img={img}
            setTitle={setTitle} 
            setImg={setImg}
          />}
        ></Route>
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
          />}>
        </Route>
        <Route
          path='/article'
          component ={() =>
          <ArticlePage title={title} img={img} />
          }>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
