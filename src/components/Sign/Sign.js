import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import "./Signup.scss";
import { createUser, initLogin } from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

function Sign(props) {
const {user, setUser} = props
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [hasAccount, setHasAccount] = useState(false);
const [signInError, setSignInError] = useState("");
const [signUpError, setSignUpError] = useState("");  

const history = useHistory();

const successSignIn = () => {
    history.push('/main');
  };


const clearErrors = () => {
    setSignUpError("");
    setSignInError("");
  };

const handleSignUp = () => {
    clearErrors();
    createUser(email, password)
      .then(() => {
        localStorage.setItem('userEmail', JSON.stringify(email));
        setUser(true);
      })
      .catch((err) => {
        setSignUpError(err.message);
      })
    };
    
const handleSignIn = () => {
    clearErrors();
    initLogin(email, password)
      .then(() => {
        localStorage.setItem('userEmail', JSON.stringify(email));
        setUser(true);
        successSignIn();
      })
      .catch(err => {
        setSignInError(err.message);
      })
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{ !hasAccount ? "Sign in" : "Sign Up"}</h1>
        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter the Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p className="err-msg"></p>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="err-msg"></p>
        <div className="btn-container">
          { hasAccount ? (

          <>
            <button className="sign-btn" onClick={handleSignUp}>Sign Up</button>
            <p>
              Allready have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
            </p>
          </>
          ) : (
            <>
              <button className="sign-btn" onClick={handleSignIn}>Sign In</button>
                <p>
                  Don't have an account ?
                    <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
                </p>
            </>
          )
        }
        </div>
        { (signInError || signUpError) && <ErrorModal setSignInError={setSignInError} setSignUpError={setSignUpError} signInError={signInError} signUpError={signInError} />}
      </div>
    </div>
  );
}

export default Sign;
