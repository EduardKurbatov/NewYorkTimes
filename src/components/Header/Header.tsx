import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultLogo from '../../assets/nouserimg.jpg';  
import fire from '../../fire';

interface Props {
  setUser: (value: React.SetStateAction<object>) => void,
  hasAccount: Boolean,
  setHasAccount: (value: React.SetStateAction<boolean>) => void
}

const Home = ({setUser, hasAccount, setHasAccount}: Props) => {

  const history = useHistory();

  const goToMainPage = (): void => {
    history.push('/main');
  };

  const goToSign = (): void => {
    history.push('/sign');
  };

  const goToProfilePage = (): void => { 
    history.push('/profile');
  };

  const handleLogOut = (): void => {
    fire.auth().signOut()
    localStorage.clear();
    setUser({});
    setHasAccount(false)
    goToSign();
  };  
  
  return (
    <div className="header-container">
      <h1 className="header" onClick={goToMainPage}>
        NY Times
      </h1>
      {hasAccount ? (
          <div className="exist-user">
            {fire.auth().currentUser?.photoURL ? (
              <img width="45" height="45" src={fire.auth().currentUser?.photoURL?.toString()} alt={''} /> 
              ) : (
              <img width="45" height="45" src={defaultLogo} alt={''} /> 
            )}
            <li className="drop-down">
              <button className="drop-down-btn" onClick={goToProfilePage}>
                Profile
              </button>
              <button className="drop-down-btn" onClick={handleLogOut}>
                LogOut
              </button>
            </li>
          </div>
      ) : (
          <button className="login-btn" onClick={goToSign}>Login</button>
      )}
    </div>
  );
};

export default Home;
