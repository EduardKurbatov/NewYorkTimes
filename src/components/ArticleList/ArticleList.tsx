import './ArticleList.scss';
import { ArticleRecord } from '../types';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { Routes } from '../../App';

type Props = {
  user: firebase.User | null,
  articles: ArticleRecord[],
  setArticleItems: (value: React.SetStateAction<ArticleRecord | undefined>) => void,
  setShowArticle: (value: React.SetStateAction<boolean>) => void
};

function ArticleList ({user, articles, setArticleItems, setShowArticle} : Props) {
  const history = useHistory();

  const itemsListener = (index: number) => {
    if (user) {
      setArticleItems(articles[index]);
      setShowArticle(true);
    } else {
      history.push(Routes.SIGN);
    }
  };

  return (
    <div className="articles-container"> 
      {articles.map(({byline, title, media}: ArticleRecord, index) => {
        return (
          <div className="article" key={index} onClick={() => {itemsListener(index)}}>
            <div className="fade"></div>
            <div className="author-container">
              <span className="author">{byline}</span>
            </div>
            <div className="title-container">
              <span className="title">{title}</span>
            </div>
            {media[0] && <img className="article-title-image" src={media[0]["media-metadata"][2].url} alt={title} />}
          </div>
        )})}
    </div>
  )
};

export default ArticleList;
