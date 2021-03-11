import './Main.scss';

function execute() {
  const url = "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=oLLGAGDyC2xECFJqIDKqxlczH0fE3gGO";
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
  };
  fetch(url, options).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then(err => {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorMessage: err,
        });
      });
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
}

function Main() {
    return (
        <div className="main-page">
            <h1>This is main page</h1>
            <button onClick={execute}>Exe</button>
        </div>
    )
}

export default Main
