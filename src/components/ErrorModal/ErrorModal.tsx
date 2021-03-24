import './ErrorModal.scss'

interface Props {
    errorMessages: string[],
    setErrorMessages: (value: React.SetStateAction<string[] | null>) => void
}

function ErrorModal(props: Props) {

const {errorMessages, setErrorMessages} = props

const closeModal = () => {
  setErrorMessages(null);
}

  return (
    <div className="error-whindow">
      <p>{errorMessages}</p>
      <button onClick={closeModal}>OK</button>
    </div>
  )
}

export default ErrorModal
