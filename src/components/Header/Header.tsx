import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';  
import fire from '../../fire';
import firebase from 'firebase';

type Props = {
  user: firebase.User | null,
  setUser: (value: React.SetStateAction<firebase.User | null>) => void,
  userAvatar: string | null | undefined,
};

const Header = ({user, userAvatar}: Props) => {
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
          <img className="user-avatar" src={userAvatar || defaultPhoto} alt="User avatar" />
          <div className="drop-down">
            <div className="drop-down-item">
              <button className="drop-down-btn" onClick={() => {history.push('/profile')}}>Profile</button>
              <button className="drop-down-btn" onClick={handleLogOut}>LogOut</button>
            </div>
          </div>  
        </div>
      ) : (
          <button className="login-btn" onClick={() => {history.push('/sign')}}>Login</button>
      )}
    </div>
  );
};

export default Header;
