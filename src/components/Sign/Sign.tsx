import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

const Sign = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassWord, setValidPassWord] = useState<boolean>(true);
  const [validConfirmedPassword, setValidConfirmedPassword] = useState<boolean>(true);
  const [validUserData, setValidUserData] = useState<boolean>(false);
  const [accountWasCreated, setAccountWasCreated] = useState<boolean>(false);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?!.*[&%$]).{8,}$/;
  const history = useHistory();

  const successSignIn = (): void => {
    history.push('/main');
  };

  const clearErrors = (): void => {
    setErrorMessages([]);
  };

  const clearInputs = (): void => {
    setEmail('');
    setPassword('');
  };

  const changeSign = (): void => {
    setAccountWasCreated(!accountWasCreated);
    clearInputs();
  };

  const validateEmail = () => {
    return setValidEmail(emailRegex.test(String(email).toLowerCase()));
};

  const validatePassword = () => {
    return setValidPassWord(passwordRegex.test(password));
  };

  const validateConfirmedPassword = () => {
    return setValidConfirmedPassword(password === confirmedPassword);
  };

  const validDataListener = (): void => {
    setValidUserData(validEmail && validPassWord && validConfirmedPassword);
  };

  const handleSignUp = (): void => {
    validateEmail();
    validatePassword();
    validateConfirmedPassword();
    validDataListener();

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
    clearErrors();
    initLogin(email, password).then(() => {
      successSignIn();
    }).catch(err => {
      setErrorMessages(err.message);
    });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{accountWasCreated ? "Sign Up" : "Sign In"}</h1>
        <label>User Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => {setValidEmail(true)}}
        />
        {!validEmail && <p className="err-msg">email must be in valid format</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => {setValidPassWord(true)}}
        />
        {accountWasCreated && (
        <>
          {!validPassWord && <p className="err-msg">Password must contain at least 8 characters,including UPPER/lowercase and numbers</p>}
          <label>Confirm The Password</label>
          <input
            type="password"
            placeholder="Confirm the password"
            required
            value={confirmedPassword}
            onChange={e => setConfirmedPassword(e.target.value)}
            onFocus={() => {setValidConfirmedPassword(true)}}
        />
          {!validConfirmedPassword && <p className="err-msg">Confirmed password is not the same as password</p>}
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
