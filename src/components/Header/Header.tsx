import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';  
import fire from '../../fire';

type Props = {
  user: any,
  setUser: (value: React.SetStateAction<any>) => void,
  hasAccount: boolean,
  setHasAccount: (value: React.SetStateAction<boolean>) => void,
};

const Header = ({setUser, user, hasAccount}: Props) => {
  const history = useHistory();

  const handleLogOut = (): void => {
    fire.auth().signOut();
    history.push('/sign');
  };

  return (
    <div className="header-container">
      <h1 className="header" onClick={() => {history.push('/')}}>NY Times</h1>
      {user ? (
          <div className="exist-user">
            <img className="user-avatar" src={user.photoURL || defaultPhoto} alt="User avatar" />
            <div className="drop-down">
              <li className="drop-down-item">
                <button className="drop-down-btn" onClick={() => {history.push('/profile')}}>Profile</button>
                <button className="drop-down-btn" onClick={handleLogOut}>LogOut</button>
              </li>
            </div>  
          </div>
      ) : (
          <button className="login-btn" onClick={() => {history.push('/sign')}}>Login</button>
      )}
    </div>
  );
};

export default Header;
