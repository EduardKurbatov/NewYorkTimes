import './ArticleList.scss';
import { ArticleItem, ArticleItems } from '../types';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { Routes } from '../../App';

type Props = {
  user: firebase.User | null,
  articles: ArticleItems[],
  setArticleItems: (value: React.SetStateAction<ArticleItem | undefined>) => void,
  setShowArticle: (value: React.SetStateAction<boolean>) => void
}


function ArticleList ({user, articles, setArticleItems, setShowArticle} : Props) {
  const history = useHistory();

  const itemsListener = ({title, media, byline, des_facet, abstract} : ArticleItems) => {
    if (user) { 
      const items = {
        title: title,
        imgUrl: media[0] ? media[0]['media-metadata'][2].url : '',
        byLine: byline,
        des_facet: des_facet,
        abstract: abstract
      }
      setArticleItems(items);
      setShowArticle(true);
    } else {
      history.push(Routes.SIGN);
    }
  };

  return (
    <div className="articles-container"> 
      {articles.map((article: ArticleItems, index) => {
        return (
          <div className="article" key={index} onClick={() => {itemsListener(article)}}>
          <div className="fade"></div>
          <div className="author-container">
            <span className="author">{article.byline}</span>
          </div>
          <div className="title-container">
            <span className="title">{article.title}</span>
          </div>
          {article.media[0] && <img className="article-title-image" src={article.media[0]["media-metadata"][2].url} alt={article.title} />}
          </div>
        )})}
    </div>
  )
};

export default ArticleList;
