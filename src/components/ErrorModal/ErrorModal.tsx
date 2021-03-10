import './ErrorModal.scss'

interface Props {
    signInError: string ,
    signUpError: string ,
    setSignInError: (value: React.SetStateAction<string>) => void,
    setSignUpError: (value: React.SetStateAction<string>) => void
}

function ErrorModal(props: Props) {

const {signUpError, signInError, setSignInError, setSignUpError} = props

const closeModal = () => {
  setSignInError("");
  setSignUpError("");
}

  return (
    <div className="error-whindow">
      <p>{signUpError || signInError}</p>
      <button onClick={closeModal}>OK</button>
    </div>
  )
}

export default ErrorModal
