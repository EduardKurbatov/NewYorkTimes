import './Main.scss';
import { useState } from 'react';


type MediaAsset =  {
  url: string,
  format: string,
  height: number,
  width: number,
};

type Media  = {
  approved_for_syndication: number,
  caption: string,
  copyright: string,
  'media-metadata': MediaAsset[],
  subtype: string,
  type: string
};

type Article = {
  abstract: string,
  adx_keywords: string,
  asset_id: number,
  byline: string,
  column: number,
  des_facet: string[],
  eta_id: number,
  geo_facet: any[],
  id: number,
  media: Media[], // TODO: ADD CUSTOM TYPE FOR MEDIA
  nytdsection: string,
  org_facet: string[],
  per_facet: string[],
  published_date: string,
  section: string,
  source: string,
  subsection: string,
  title: string,
  type: string,
  updated: string,
  uri: string,
  url: string
};


function Main() {
  const [articles, setArticles] = useState<Article[]>([]);

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
        console.log(data.results);
        return setArticles(data.results)
      })
      .catch(err => {
        console.error(err);
      });
  };

return (
  <div className="main-page">
    <h1>This is main page</h1>
    <button onClick={execute}>Exe</button>
    <div>
      {articles.map((article: Article, index) => {
          return (
          <div key={index}>
            <span>{article.title}</span>
          </div>
          )
      })}
    </div>
  </div>
  )
}

export default Main