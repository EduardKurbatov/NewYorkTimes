import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import fire from '../../fire';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

function Sign(props) {
  const {user, setUser, hasAccount, setHasAccount} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  // const [hasAccount, setHasAccount] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validEmailErr, setValidEmailErr] = useState('');
  const [validPassWord, setValidPassWord] = useState(false);
  const [validPassErr, setValidPassErr] = useState('');
  const [validConfirmedPassword, setValidConfirmedPassword] = useState(false);
  const [confirmedPassErr, setConfirmedPassErr] = useState('');	
  const [validUserData, setValidUserData] = useState(false);	

  const history = useHistory();

  const successSignIn = () => {
    history.push('/main');
  };

  const clearErrors = () => {
    setSignUpError('');
    setSignInError('');
  };

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const changeSign = () => {
    setHasAccount(!hasAccount);
    clearInputs();
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
    return setValidEmail(re.test(String(email).toLowerCase()))
  } else {
    return setValidEmail(re.test(String(email).toLowerCase()));
  };
};

  const validatePassword = () => {
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?!.*[&%$]).{8,}$/;
    if(re.test(password)) {
      return setValidPassWord(re.test(password));
    } else { 
      return setValidPassWord(re.test(password));
    };
  };

  const validateConfirmedPassword = () => {
    if(password === confirmedPassword) {
      return setValidConfirmedPassword(true);
    } else {
      return setValidConfirmedPassword(false);
    }
  };

  const validDataListener = () => {
      if(validEmail && validPassWord && validConfirmedPassword) {
        setValidUserData(true);
      } else {
        setValidUserData(false)
      }
  }


  const handleSignUp = () => {
    switch(false) {
      case validEmail :  
      setValidEmailErr('email must be in valid format');
      break;
      case validPassWord:
      setValidPassErr('Password must contain at least 8 characters,including UPPER/lowercase and numbers');
      break;
      case validConfirmedPassword:
      setConfirmedPassErr('Confirmed password is not the same as password');
      break;
      default:
    }
    if(validUserData) {
      clearErrors();
      createUser(email, password)
        .then(() => {
          successSignIn();
        })
        .catch(err => {
          setSignUpError(err.message);
        });
    }; 
  };

  const handleSignIn = () => {
    clearErrors();
    initLogin(email, password)
    .then(() => {
        successSignIn();
      })
      .catch(err => {
        setSignInError(err.message);
      });
    };

  useEffect(() => {
    validateEmail();
    validatePassword();
    validateConfirmedPassword();
    validDataListener();
  })

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{!hasAccount ? "Sign in" : "Sign Up"}</h1>
        <label>User Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p className="err-msg">{validEmail ? '' : validEmailErr }</p>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {hasAccount ? (
          <>
        <p className="err-msg">{validPassErr}</p>
        <label>Confirm The Password</label>
        <input
          type="password"
          placeholder="Confirm the password"
          required
          value={confirmedPassword}
          onChange={e => setConfirmedPassword(e.target.value)}
        />
        {confirmedPassErr ? (<p className="err-msg">{confirmedPassErr}</p>) : (<></>)}
        </>
        ) : (
          <>
          </>
        )}
        <div className="btn-container">
          {hasAccount ? (
            <>
              <button className="sign-btn" onClick={handleSignUp}>
                Sign Up
              </button>
              <p>
                Allready have an account ?
                <span onClick={changeSign}> Sign in</span>
              </p>
            </>
          ) : (
            <>
              <button className="sign-btn" onClick={handleSignIn}>
                Sign In
              </button>
              <p>
                Don't have an account ?
                <span onClick={changeSign}> Sign Up</span>
              </p>
            </>
          )}
        </div>
        {(signInError || signUpError) && (
          <ErrorModal
            setSignInError={setSignInError}
            setSignUpError={setSignUpError}
            signInError={signInError}
            signUpError={signInError}
          />
        )}
      </div>
    </div>
  );
}

export default Sign;