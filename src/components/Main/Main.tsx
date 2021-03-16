import './Main.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
  media: Media[],
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

interface Props {
  hasAccount: boolean,
  title: string,
  img: string,
  setTitle: (value: React.SetStateAction<string>) => void,
  setImg: (value: React.SetStateAction<string>) => void,
}


function Main(props: Props) {
 const {hasAccount, title, img, setTitle, setImg} = props
  const [articles, setArticles] = useState<Article[]>([]);
  // const [title, setTitle] = useState<string>('');
  // const [img, setImg] = useState<string>('');

  const history = useHistory();

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

    
    useEffect(() => { 
      execute()
    }, [])
       
return (
  <div className="main-page">
    <div className="articles-container"> 
      {articles.map((article: Article, index) => {
        return (
             <div className="article" key={index} onClick={() => {
                if(hasAccount) { 
                  history.push('/article');
                  setTitle(article.title);
                  setImg(article.media[0] ? article.media[0]['media-metadata'][2].url : '');
                } else {
                  history.push('/sign');
              } 
             }}>
            <div className="title">
              <span>{article.title}</span>
            </div>
            { article.media[0] && <img src={article.media[0]["media-metadata"][2].url} alt={article.title} /> }
          </div>
          )
        })}
    </div>
  </div>
  )
}

export default Main