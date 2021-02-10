import './ErrorModal.scss';

function ErrorModal(props) {
  const { signUpError, signInError, setSignInError, setSignUpError } = props;

  const closeModal = () => {
    setSignInError('');
    setSignUpError('');
  };

  return (
    <div className="error-whindow">
      <p>{signUpError || signInError}</p>
      <button onClick={closeModal}>OK</button>
    </div>
  );
}

export default ErrorModal;
