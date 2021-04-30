import './Article.scss';
import { ArticleRecord } from '../types';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  articleRecords: ArticleRecord | undefined,
  setArticleRecords: (value: React.SetStateAction<ArticleRecord | undefined>) => void,
};

function Article ({articleRecords, setArticleRecords}: Props) {
  const backToArticleList = () => {
    setArticleRecords(undefined);
  };

  return (
    <div className="article-page">
      <div className="fade"></div>
      {articleRecords?.media && <img className="article-image" src={articleRecords?.media[0]['media-metadata'][2].url} />}
      <div className="article-items">
        <button className="go-back-button" onClick={backToArticleList}><IoIosArrowBack className="arrow-back-icon" />Go Back</button>
        <div className="title">
          <span className="title">{articleRecords?.title}</span>
        </div>
        <div className="author">
          <span>{articleRecords?.byline}</span>
        </div>
        <div className="tags">
         {articleRecords?.des_facet.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                <span>{tag}</span>
              </div>
            )
          })}
        </div>
        <div className="information">
          <span>{articleRecords?.abstract}</span>
        </div>
      </div>
    </div>
  )
};

export default Article;
