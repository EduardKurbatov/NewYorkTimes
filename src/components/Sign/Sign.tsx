import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

interface Props {
  hasAccount: Boolean,
  setHasAccount: (value: React.SetStateAction<boolean>) => void
}

const Sign =(props: Props) => {
  const {hasAccount, setHasAccount} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validEmailErr, setValidEmailErr] = useState<string>('');
  const [validPassWord, setValidPassWord] = useState<boolean>(false);
  const [validPassErr, setValidPassErr] = useState<string>('');
  const [validConfirmedPassword, setValidConfirmedPassword] = useState<boolean>(false);
  const [confirmedPassErr, setConfirmedPassErr] = useState<string>('');
  const [validUserData, setValidUserData] = useState<boolean>(false);
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
    setHasAccount(!hasAccount);
    clearInputs();
  }

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
      default: setValidUserData(true);
    };

    if(validUserData) {
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

  useEffect(() => {
    validateEmail();
    validatePassword();
    validateConfirmedPassword();
    validDataListener();
  });

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{hasAccount ? "Sign Up" : "Sign In"}</h1>
        <label>User Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p className="err-msg">{validEmail && validEmailErr}</p>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {hasAccount && (
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
        )}
        <div className="btn-container">
          <button className="sign-btn" onClick={hasAccount ? handleSignUp : handleSignIn}>
            Sign {hasAccount ? "Up" : "In"}
          </button>
          <p>
            {hasAccount ? "Allready have an account ?" : "Don't have an account ?"}
            <span onClick={changeSign}>Sign {hasAccount ? "In" : "Up"}</span>
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
