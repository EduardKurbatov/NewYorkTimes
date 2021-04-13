import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.scss';
import { createUser, initLogin} from '../utils';
import ErrorModal from '../ErrorModal/ErrorModal';
import firebase from 'firebase';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/;

type Field = {
  value: string,
  isValid: () => boolean,
  displayError: boolean,
  errorMessage: string,
};

type userAuthParams = {
  email: string,
  password: string,
  authFunc: (email: string, password: string) => Promise<firebase.auth.UserCredential>
};

const defaultEmailState: Field = {
  value: '',
  isValid: function() { 
    return emailRegex.test(this.value.toLowerCase());
  },
  displayError: false,
  errorMessage: 'Email must be in valid format'
};

const defaultPasswordState: Field = {
  value: '',
  isValid: function() {
    return passwordRegex.test(this.value);
  },
  displayError: false,
  errorMessage: 'Password must contain at least 6 characters,including lowercase and numbers'
};

const defaultConfirmedPasswordState: Partial<Field> = {
  value: '',
  displayError: false,
  errorMessage: 'Confirmed password is not the same as password'
};

interface Props {
  user: any,
  setUser: (value: React.SetStateAction<any>) => void,
}

const Sign = ({setUser, user} : Props) => {
  const [email, setEmail] = useState<Field>(defaultEmailState);
  const [password, setPassword] = useState<Field>(defaultPasswordState);
  const [confirmedPassword, setConfirmedPassword] = useState<Partial<Field>>(defaultConfirmedPasswordState);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [accountWasCreated, setAccountWasCreated] = useState<boolean>(false);
  const history = useHistory();

  const isSignUpFormValid = () : boolean => {
    return areEmailPasswordValid() && arePasswordsEqual();
  };

  const areEmailPasswordValid = () : boolean => {
    return email.isValid() && password.isValid();
  };

  const arePasswordsEqual = (): boolean => {
    return confirmedPassword.value === password.value;
  };

  const clearErrors = (): void => {
    setErrorMessages(null);
  };

  const clearInputs = (): void => {
    setEmail({...email, value: ''});
    setPassword({...password, value: ''});
    setConfirmedPassword({...confirmedPassword, value: ''});
  };

  const toggleBetweenAuthForms = (): void => {
    setAccountWasCreated(!accountWasCreated);

    if (areEmailPasswordValid()) {
      clearInputs();
    }
  };

  const runUserAuth = async ({email, password, authFunc}: userAuthParams): Promise<void> => {
    try {
      await authFunc(email, password);
      history.push('/');
    } catch (err) {
      setErrorMessages(err?.message);
    }
  };

  const handleSignUp = (): void => {
    setEmail({...email, displayError: !email.isValid()});
    setPassword({...password, displayError: !password.isValid()});
    setConfirmedPassword({...confirmedPassword, displayError: !arePasswordsEqual()});

    if (isSignUpFormValid()) {
      clearErrors();
      runUserAuth({email: email.value, password: password.value, authFunc: createUser});
    }
  };

  const handleSignIn = (): void => {
    setEmail({...email, displayError: !email.isValid()});
    setPassword({...password, displayError: !password.isValid()});

    if (areEmailPasswordValid()) {
      clearErrors();
      runUserAuth({email: email.value, password: password.value, authFunc: initLogin});
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
          onFocus={() => {setEmail({...email, displayError: false})}}
        />
        {email.displayError && <p className="err-msg">{email.errorMessage}</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password?.value}
          onChange={e => setPassword({...password, value: e.target.value})}
          onFocus={() => {setPassword({...password, displayError: false})}}
        />
        {password.displayError && <p className="err-msg">{password.errorMessage}</p>}
        {accountWasCreated && (
        <>
          <label>Confirm The Password</label>
          <input
            type="password"
            placeholder="Confirm the password"
            required
            value={confirmedPassword?.value}
            onChange={e => {setConfirmedPassword({...confirmedPassword, value: e.target.value})}}
            onFocus={() => {setConfirmedPassword({...confirmedPassword, displayError: false})}}
          />
          {confirmedPassword.displayError && <p className="err-msg">{confirmedPassword.errorMessage}</p>}
        </>
        )}
        <div className="btn-container">
          <button className="sign-btn" onClick={accountWasCreated ? handleSignUp : handleSignIn}>
            Sign {accountWasCreated ? 'Up' : 'In'}
          </button>
          <p>
            {accountWasCreated ? 'Allready have an account ?' : 'Don`t have an account ?'}
            <span onClick={toggleBetweenAuthForms}>Sign {accountWasCreated ? 'In' : 'Up'}</span>
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
