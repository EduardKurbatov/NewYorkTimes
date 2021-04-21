import './Header.scss';
import { useHistory } from 'react-router-dom';
import defaultPhoto from '../../assets/nouserimg.jpg';  
import fire from '../../fire';
import 'ionicons-npm//css/ionicons.css';

type Props = {
  user: any,
};

const Header = ({user}: Props) => {
  const history = useHistory();

  const handleLogOut = (): void => {
    fire.auth().signOut();
    history.push('/sign');
  };

  return (
    <div className="header-container">
      <h1 className="header" onClick={() => {history.push('/')}}>NY Times</h1>
      {user ? (
        <div className="user-controls-container">
          <div className="avatar-wrapper">
            <img className="user-avatar" src={user.photoURL || defaultPhoto} alt="User avatar" />
            <i className="ion-chevron-down"></i>
          </div>
          <div className="drop-down-items">
            <button className="drop-down-item" onClick={() => {history.push('/profile')}}>Profile<i className="ion-android-person"></i></button>
            <button className="drop-down-item" onClick={handleLogOut}>Logout<i className="ion-log-out"></i></button>
          </div>
        </div>
      ) : (
        <button className="login-btn" onClick={() => {history.push('/sign')}}><i className="ion-ios-personadd"></i></button>
      )}
    </div>
  );
};

export default Header;
