import './ErrorModal.scss'

interface Props {
  errorMessages: string[],
  setErrorMessages: (value: React.SetStateAction<string[] | null>) => void
}

function ErrorModal({errorMessages, setErrorMessages}: Props) {

  const closeModal = () => {
    setErrorMessages(null);
  };

  return (
    <div className="error-whindow">
      <p>{errorMessages}</p>
      <button onClick={closeModal}>OK</button>
    </div>
  )
}

export default ErrorModal;
