import '../ArticlePage/ArticlePage.scss';
import { useHistory } from 'react-router-dom';


interface Props {
    title: string,
    img: string
}


function ArticlePage(props: Props) {
    const {title, img} = props
    const history = useHistory();    
    
    const goToAllArticles = () => {
        history.push('/main')
    }

    return (
        <div className='article-page'>
            <div className="title">
            <span>{title}</span>
            </div>
            <img className="article-image" src={img} alt={' '}/>
            <button className="go-back-button" onClick={goToAllArticles}>Go Back</button>
        </div>
    )
}

export default ArticlePage
