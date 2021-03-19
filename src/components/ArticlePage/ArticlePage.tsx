import '../ArticlePage/ArticlePage.scss';
import { useHistory } from 'react-router-dom';
import { Items } from '../../App';
interface Props {
  articleItems: Items | undefined
}


function ArticlePage(props: Props) {
  const {articleItems} = props
  const history = useHistory();    
  
  const goToAllArticles = () => {
      history.push('/main')
  }

  return (
    <div className='article-page'>
      <div className="fade"></div>
        <img className="article-image" src={articleItems?.imgUrl} alt={' '}/>
        <div className="article-items">
          <button className="go-back-button" onClick={goToAllArticles}>Go Back</button>
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
}

export default ArticlePage
