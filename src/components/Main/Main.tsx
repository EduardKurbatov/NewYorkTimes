import './Main.scss';
import { useEffect, useState } from 'react';
import { ArticleItems, ArticleItem } from '../types';
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
  const [articles, setArticles] = useState<ArticleItems[]>([]);
  const [articleItems, setArticleItems] = useState<ArticleItem | undefined>();
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
    getArticles();
  }, []);

  return (
    <div className="main-page">
      {!showArticle
        ?
          <ArticleList user={user} articles={articles} setArticleItems={setArticleItems} setShowArticle={setShowArticle} />
        :
          <Article articleItems={articleItems} setArticleItems={setArticleItems} setShowArticle={setShowArticle} />}
    </div>
  );
};

export default Main;
