import '../ArticlePage/ArticlePage.scss';
import { Items } from '../types';
import { IoIosArrowBack} from 'react-icons/io';

interface Props {
  articleItems: Items | undefined,
  setArticleItems: (value: React.SetStateAction<Items | undefined>) => void,
  setShowArticle: (value: React.SetStateAction<boolean>) => void
};

function ArticlePage ({articleItems, setShowArticle, setArticleItems}: Props) {

  const backToArticleList = () => {
    setShowArticle(false);
    setArticleItems(undefined);
  };

  return (
    <div className='article-page'>
      <div className="fade"></div>
      {articleItems?.imgUrl && <img className="article-image" src={articleItems?.imgUrl} />}
      <div className="article-items">
        <button className="go-back-button" onClick={backToArticleList}><IoIosArrowBack className="arrow-back-icon" />Go Back</button>
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
