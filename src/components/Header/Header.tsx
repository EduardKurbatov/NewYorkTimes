import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';  
import { useState, useEffect } from 'react';
import fire from '../../fire';

interface Props {
  user: any,
  setUser: (value: React.SetStateAction<any>) => void,
}

const Header = ({setUser, user}: Props) => {
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>('');
  const history = useHistory();

  const handleLogOut = (): void => {
    fire.auth().signOut();
    localStorage.clear();
    setUser(null);
    history.push('/sign');
  };

  useEffect(() => {
    setUserPhoto(user ? fire.auth().currentUser?.photoURL : null);
  }, [user]);

  return (
    <div className="header-container">
      <h1 className="header" onClick={() => {history.push('/')}}>NY Times</h1>
      {user ? (
          <div className="exist-user">
            <img className="user-avatar" src={userPhoto || defaultPhoto} alt="" /> 
              <li className="drop-down">
                <button className="drop-down-btn" onClick={() => {history.push('/profile')}}>Profile</button>
                <button className="drop-down-btn" onClick={handleLogOut}>LogOut</button>
              </li>
          </div>
      ) : (
          <button className="login-btn" onClick={() => {history.push('/sign')}}>Login</button>
      )}
    </div>
  );
};

export default Header;
