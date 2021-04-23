import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';
import { useState } from 'react';
import fire from '../../fire';
import firebase from 'firebase';
import { Routes } from '../../App';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { FaSignOutAlt, FaUser } from "react-icons/fa";

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
        ? <div className="user-controls-container" onClick={() => {setActiveDropDown(!activeDropDown)}}>
          <div className="avatar-wrapper">
            <img className="user-avatar" src={user.photoURL || defaultPhoto} alt="User avatar" />
            {!activeDropDown ?<IoIosArrowDown className="chevron" /> : <IoIosArrowUp className="chevron" />}
          </div>
            {activeDropDown && 
              <div className="drop-down-items">
                <button className="drop-down-item" onClick={() => {history.push(Routes.PROFILE)}}>Profile <FaUser className="profile-icon" /></button>
                <button className="drop-down-item" onClick={handleLogOut}>LogOut <FaSignOutAlt className="logout-icon" /></button>
              </div>}
            </div>
        : <button className="login-btn" onClick={() => {history.push(Routes.SIGN)}}>Login</button>
      }
    </div>
  );
};

export default Header;
