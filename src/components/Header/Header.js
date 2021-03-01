import './Header.scss';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import fire from '../../fire';

function Home({user, setUser, hasAccount, setHasAccount}) {
  const history = useHistory();

  const goToMainPage = () => {
    history.push('/main');
  };

  const goToSign = () => {
    history.push('/sign');
  };

  const goToProfilePage = () => {
    history.push('/profile');
  };

  const handleLogOut = () => {
    fire.auth().signOut()
    localStorage.clear();
    setUser(null);
    setHasAccount(false)
    goToSign();
  };

  return (
    <div className="header-container">
      <h1 className="header" onClick={goToMainPage}>
        NY Times
      </h1>
      {user ? (
          <div className="exist-user">
            <img width="45" height="45" src={fire.auth().currentUser.photoURL} alt={''} />
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
}

export default Home;
