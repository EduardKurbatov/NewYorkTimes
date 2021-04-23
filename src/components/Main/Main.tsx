import './Main.scss';
import { useEffect, useState } from 'react';
import { Article } from '../types';
import { Redirect, useHistory } from 'react-router';
import firebase from 'firebase';
import { Items } from '../types';
import { Routes } from '../../App';
import ArticlePage from '../ArticlePage/ArticlePage';

const url = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=oLLGAGDyC2xECFJqIDKqxlczH0fE3gGO';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  },
};

type Props = {
  user: firebase.User | null,
};

function Main({user}: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleItems, setArticleItems] = useState<Items | undefined>();
  const [showArticle, setShowArticle] = useState<boolean>(false);

  const getArticles = async (): Promise<void> => {
    const response = await fetch(url, options);

    if (response?.ok) {
      const articles = await response.json();
      setArticles(articles.results);
    } else {
      throw new Error(response.statusText);
    };
  };

  useEffect(() => {
    getArticles()
  }, []);

  return (
    <div className="main-page">
      {!showArticle ?
      <div className="articles-container"> 
        {articles.map((article: Article, index) => {
          return (
            <div className="article" key={index} onClick={() => {
              if (user) { 
                const items = {
                  title: article.title,
                  imgUrl: article.media[0] ? article.media[0]['media-metadata'][2].url : '',
                  byLine: article.byline,
                  tags: article.des_facet,
                  abstract: article.abstract
                }
                localStorage.setItem('article', JSON.stringify(items));
                setArticleItems(items);
                setShowArticle(true);
              } else {
                <Redirect to={Routes.MAIN} />
              }
            }}>
              <div className="fade"></div>
              <div className="author-container">
                <span className="author">{article.byline}</span>
              </div>
              <div className="title-container">
                <span className="title">{article.title}</span>
              </div>
              { article.media[0] && <img className="article-title-image" src={article.media[0]["media-metadata"][2].url} alt={article.title} /> }
            </div>
        )})}
      </div> :
      <ArticlePage articleItems={articleItems} setArticleItems={setArticleItems} setShowArticle={setShowArticle} />}
    </div>
  );
};

export default Main;
