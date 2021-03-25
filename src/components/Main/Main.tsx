import './Main.scss';
import { useState } from 'react';
import { Article } from '../types';

function Main() {
  const [articles, setArticles] = useState<Article[]>([]);
  const url = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=oLLGAGDyC2xECFJqIDKqxlczH0fE3gGO';
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  };

  const getArticles = async (): Promise<void> => {
      const response = await fetch(url, options);
      if (response?.ok) {
        const articles = await response.json();
        setArticles(articles.results);
      } else {
        throw new Error(response.statusText);
      }
    };

  return (
    <div className="main-page">
      <h1>This is main page</h1>
      <button onClick={getArticles}>Exe</button>
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

export default Main;
