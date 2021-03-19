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
// export enum Routes {
//   MAIN = '/',
//   PROFILE = '/profile',
//   SIGN = '/sign',
// };

 export type Items = {
  title: string,
  imgUrl: string,
  byLine: string,
  tags: string[],
  abstract: string
}

const App: FC = () => {
  const [user, setUser] = useState<object>({});
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [articleItems, setArticleItems] = useState<Items | undefined>();

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

  console.log(articleItems);
  

  useEffect(() => {
    authListener();
  }, []);
  
  useEffect(() => {}, [user]);

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
            setArticleItems={setArticleItems}
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
          <ArticlePage articleItems={articleItems} />
          }>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
