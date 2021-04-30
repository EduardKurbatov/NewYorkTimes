import './Main.scss';
import { useEffect, useState } from 'react';
import { ArticleRecord } from '../types';
import firebase from 'firebase';
import Article from '../Article/Article';
import ArticleList from '../ArticleList/ArticleList';

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
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [articleRecords, setArticleRecords] = useState<ArticleRecord | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const getArticles = async (): Promise<void> => {
    const response = await fetch(url, options);

    if (response?.ok) {
      const articles = await response.json();
      setArticles(articles.results);
    } else {
      throw new Error(response.statusText);
    };
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return loading
    ? <h2>loading...</h2>
    : <div className="main-page">
      {!articleRecords
        ? <ArticleList user={user} articles={articles} setArticleRecords={setArticleRecords} />
        : <Article articleRecords={articleRecords} setArticleRecords={setArticleRecords} />
      }
    </div>
};

export default Main;
