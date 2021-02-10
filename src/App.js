import "./App.scss";
import { useEffect, useState } from 'react';
import Sign from './components/Sign/Sign';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';



function App() {
	const [userExist, setUserExist] = useState(false);
    // let userExist = localStorage.getItem('userEmail');  


	useEffect(() => {
	}, [userExist])

  return (
	<BrowserRouter>	
		<div className="App">				
				<Header user = {userExist} setUser = {setUserExist} />
				<Route path="/main" component={Main}></Route>
				<Route path="/sign" component={() => <Sign user = {userExist} setUser = {setUserExist} />}></Route>
				<Route path="/profile" component={Profile}></Route>
				
		</div>
	</BrowserRouter>	 
  );
}

export default App;
