import './Article.scss';
import { ArticleRecord } from '../types';
import { IoIosArrowBack} from 'react-icons/io';

interface Props {
  articleItems: ArticleRecord | undefined,
  setArticleItems: (value: React.SetStateAction<ArticleRecord | undefined>) => void,
  setShowArticle: (value: React.SetStateAction<boolean>) => void
};

function Article ({articleItems, setShowArticle, setArticleItems}: Props) {
  const backToArticleList = () => {
    setShowArticle(false);
    setArticleItems(undefined);
  };

  return (
    <div className="article-page">
      <div className="fade"></div>
      {articleItems?.media && <img className="article-image" src={articleItems?.media[0]['media-metadata'][2].url} />}
      <div className="article-items">
        <button className="go-back-button" onClick={backToArticleList}><IoIosArrowBack className="arrow-back-icon" />Go Back</button>
        <div className="title">
          <span className="title">{articleItems?.title}</span>
        </div>
        <div className="author">
          <span>{articleItems?.byline}</span>
        </div>
        <div className="tags">
         {articleItems?.des_facet.map((tag, index) => {
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

export default Article;
