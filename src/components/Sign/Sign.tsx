import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

type Field = {
  value: string,
  isValid: () => boolean,
  error: boolean,
  errorMessage: string,
};

type ConfirmField = {
    value: string,
    error: boolean,
    errorMessage: string
};

const defaultEmailState = {
  value: '',
  isValid: function() { 
    return emailRegex.test(this.value.toLowerCase());
  },
  error: false,
  errorMessage: 'email must be in valid format'
};

const defaultPasswordState = {
  value: '',
  isValid: function() {
    return passwordRegex.test(this.value);
  },
  error: false,
  errorMessage: 'Password must contain at least 6  characters,including UPPER/lowercase and numbers'
};

const defaultConfirmedPasswordState = {
  value: '',
  error: false,
  errorMessage: 'Confirmed password is not the same as password'
};

const Sign = () => {
  const [email, setEmail] = useState<Field>(defaultEmailState);
  const [password, setPassword] = useState<Field>(defaultPasswordState);
  const [confirmedPassword, setConfirmedPassword] = useState<ConfirmField>(defaultConfirmedPasswordState)
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [validConfirmedPassword, setValidConfirmedPassword] = useState<boolean>(false);
  const [validUserData, setValidUserData] = useState<boolean>(false);
  const [accountWasCreated, setAccountWasCreated] = useState<boolean>(false);
  const history = useHistory();

  const validateConfirmedPassword = () => {
    return setValidConfirmedPassword(confirmedPassword.value === password.value);
  };

  useEffect(() => {
    validateConfirmedPassword();
  });

  const successSignIn = (): void => {
    history.push('/');
  };

  const clearErrors = (): void => {
    setErrorMessages(null);
  };

  const clearInputs = (): void => {
    setEmail({...email, value: ''});
    setPassword({...password, value: ''});
    setConfirmedPassword({...confirmedPassword, value: ''});
  };

  const changeSign = (): void => {
    setAccountWasCreated(!accountWasCreated);
    clearInputs();
  };

  const validDataListener = (): void => {
    return setValidUserData(email.isValid() && password.isValid() && validConfirmedPassword);
  };

  const handleSignUp = (): void => {
    email.isValid();
    password.isValid();
    validDataListener();
    setEmail({...email, error: !email.isValid()});
    setPassword({...password, error: !password.isValid()});
    setConfirmedPassword({...confirmedPassword, error: !validConfirmedPassword});

    if (validUserData) {
      clearErrors();
      createUser(email.value, password.value).then(() => {
        successSignIn();
      }).catch(err => {
        setErrorMessages(err.message);
      });
    }; 
  };

  const handleSignIn = (): void => {
    email.isValid();
    password.isValid();
    setEmail({...email, error: !email.isValid()});
    setPassword({...password, error: !password.isValid()});

    if (email.isValid() && password.isValid()) {
      clearErrors();
      initLogin(email.value, password.value).then(() => {
        successSignIn();
      }).catch(err => {
        setErrorMessages(err.message);
      });
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="heading">{accountWasCreated ? 'Sign Up' : 'Sign In'}</h1>
        <label>User Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          required
          value={email?.value}
          onChange={e => setEmail({...email, value: e.target.value})}
          onFocus={() => {setEmail({...email, error: false})}}
        />
        {email.error && <p className="err-msg">{email.errorMessage}</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password?.value}
          onChange={e => setPassword({...password, value: e.target.value})}
          onFocus={() => {setPassword({...password, error: false})}}
        />
        {password.error && <p className="err-msg">{password.errorMessage}</p>}
        {accountWasCreated && (
        <>
          <label>Confirm The Password</label>
          <input
            type="password"
            placeholder="Confirm the password"
            required
            value={confirmedPassword?.value}
            onChange={e => setConfirmedPassword({...confirmedPassword, value: e.target.value})}
            onFocus={() => {setConfirmedPassword({...confirmedPassword, error: false})}}
          />
          {confirmedPassword.error && <p className="err-msg">{confirmedPassword.errorMessage}</p>}
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
