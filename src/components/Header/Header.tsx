import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';
import { useState } from 'react';
import fire from '../../fire';
import firebase from 'firebase';
import { Routes } from '../../App';

type Props = {
  user: firebase.User | null,
};

const Header = ({user}: Props) => {
  const [activeDropDown, setActiveDropDown] = useState<boolean>(false)
  const history = useHistory();

  const handleLogOut = async (): Promise<void> => {
    await fire.auth().signOut();
    history.push(Routes.SIGN);
  };

  return (
    <div className="header-container">
      <h1 className="header" onClick={() => {history.push(Routes.MAIN)}}>NY Times</h1>
      {user
        ? <div className="exist-user">
            <img className="user-avatar" src={user.photoURL || defaultPhoto} alt="User avatar" />
            <div className="drop-down">
              <div className="drop-down-item">
                <button className="drop-down-btn" onClick={() => {history.push(Routes.PROFILE)}}>Profile</button>
                <button className="drop-down-btn" onClick={handleLogOut}>LogOut</button>
              </div>
            </div>
          </div>
        : <button className="login-btn" onClick={() => {history.push(Routes.SIGN)}}>Login</button>
      }
    </div>
  );
};

export default Header;
