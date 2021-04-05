import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const Sign = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validConfirmedPassword, setValidConfirmedPassword] = useState<boolean>(false);
  const [validUserData, setValidUserData] = useState<boolean>(false);
  const [accountWasCreated, setAccountWasCreated] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState<string | null>(null);
  const history = useHistory();

  const successSignIn = (): void => {
    history.push('/');
  };

  const clearErrors = (): void => {
    setErrorMessages([]);
  };

  const clearInputs = (): void => {
    setEmail('');
    setPassword('');
    setConfirmedPassword('');
  };

  const changeSign = (): void => {
    setAccountWasCreated(!accountWasCreated);
    clearInputs();
    setValidPassword(false);
    setValidEmail(false);
    setPasswordError(null);
    setEmailError(null);
    setConfirmedPasswordError(null)
  };

  const validateEmail = (): void => {
    return setValidEmail(emailRegex.test(String(email).toLowerCase()));
  };

  const validatePassword = (): void => {
    return setValidPassword(passwordRegex.test(password));
  };

  const validateConfirmedPassword = (): void => {
    return setValidConfirmedPassword(password === confirmedPassword);
  };

  const validDataListener = (): void => {
    return setValidUserData(validEmail && validPassword && validConfirmedPassword);
  };

  const handleSignUp = (): void => {
    validDataListener();
    errorlistener();

    if (validUserData) {
      clearErrors();
      createUser(email, password).then(() => {
        successSignIn();
      }).catch(err => {
        setErrorMessages(err.message);
      });
    }; 
  };

  const handleSignIn = (): void => {
    errorlistener();

    if (validEmail && validPassword) {
      clearErrors();
      initLogin(email, password).then(() => {
        successSignIn();
      }).catch(err => {
        setErrorMessages(err.message);
      });
    }
  };

  const errorlistener = (): void => {
    if (!validEmail) {
      setEmailError('email must be in valid format');
     };

    if (!validPassword) {
      setPasswordError('Password must contain at least 6  characters,including UPPER/lowercase and numbers')
    };

    if (!validConfirmedPassword) {
      setConfirmedPasswordError('Confirmed password is not the same as password');
    };

    if (email === '') {
      setEmailError('Field must be required');
    };

    if (password === '') {
      setPasswordError('Field must be required');
    };

    if (confirmedPassword === '') {
      setConfirmedPasswordError('Field must be required');
    };
  };

  useEffect(() => {
    validateEmail();
    validatePassword();
    validateConfirmedPassword();
  });

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{accountWasCreated ? 'Sign Up' : 'Sign In'}</h1>
        <label>User Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => {setEmailError(null)}}
        />
        {emailError && <p className="err-msg">{emailError}</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => {setPasswordError(null)}}
        />
        {passwordError && <p className="err-msg">{passwordError}</p>}
        {accountWasCreated && (
        <>
          <label>Confirm The Password</label>
          <input
            type="password"
            placeholder="Confirm the password"
            required
            value={confirmedPassword}
            onChange={e => setConfirmedPassword(e.target.value)}
            onFocus={() => {setConfirmedPasswordError(null)}}
          />
          {confirmedPasswordError && <p className="err-msg">{confirmedPasswordError}</p>}
        </>
        )}
        <div className="btn-container">
          <button className="sign-btn" onClick={accountWasCreated ? handleSignUp : handleSignIn}>
            Sign {accountWasCreated ? 'Up' : 'In'}
          </button>
          <p>
            {accountWasCreated ? 'Allready have an account ?' : 'Don`t have an account ?'}
            <span onClick={changeSign}>Sign {accountWasCreated ? 'In' : 'Up'}</span>
          </p>
        </div>
        {errorMessages && 
          <ErrorModal
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
          />
        }
      </div>
    </div>
  );
}

export default Sign;
