import '../ArticlePage/ArticlePage.scss';
import { useHistory } from 'react-router-dom';
import { Items } from '../types';
import { Routes } from '../../App';
import { useEffect } from 'react';
interface Props {
  articleItems: Items | undefined,
  setArticleItems: (value: React.SetStateAction<Items | undefined>) => void,
  setShowArticle: (value: React.SetStateAction<boolean>) => void
};

function ArticlePage ({articleItems, setShowArticle, setArticleItems}: Props) {
  const history = useHistory();

  const getArticleItems = () => {
    const item = localStorage.getItem('article');
    if (item) {
      setArticleItems(JSON.parse(item));
    }
  };

  useEffect(() => {
    getArticleItems();
  }, []);

  const backToArticleList = () => {
    setShowArticle(false);
    localStorage.clear();
    setArticleItems(undefined);
  };

  return (
    <div className='article-page'>
      <div className="fade"></div>
      {articleItems?.imgUrl && <img className="article-image" src={articleItems?.imgUrl} />}
      <div className="article-items">
        <button className="go-back-button" onClick={backToArticleList}><i className="ion-chevron-left"></i>Go Back</button>
        <div className="title">
          <span className="title">{articleItems?.title}</span>
        </div>
        <div className="author">
          <span>{articleItems?.byLine}</span>
        </div>
        <div className="tags">
         {articleItems?.tags.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                <span>{tag}</span>
              </div>
            )
          })}
        </div>
        <div className="information">
          <span>{articleItems?.abstract}</span>
        </div>
      </div>
    </div>
  )
};

export default ArticlePage;
