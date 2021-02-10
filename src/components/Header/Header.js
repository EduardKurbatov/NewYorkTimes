import './Header.scss';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import fire from '../../fire';

function Home(props) {
  const { user, setUser } = props;

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

  const userExist = localStorage.getItem('userEmail');

  const handleLogOut = () => {
    fire.auth().signOut();
    localStorage.clear();
    setUser(false);
    goToSign();
  };

  useEffect(() => {}, [userExist, user]);

  return (
    <div className="header-container">
      <h1 className="header" onClick={goToMainPage}>
        NY Times
      </h1>
      {userExist ? (
        <>
          <div className="exist-user">
            <li className="drop-down">
              <button className="drop-down-btn" onClick={goToProfilePage}>
                Profile
              </button>
              <button className="drop-down-btn" onClick={handleLogOut}>
                LogOut
              </button>
            </li>
          </div>
        </>
      ) : (
        <>
          <button className="login-btn" onClick={goToSign}>
            login
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
