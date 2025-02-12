import React from 'react';
import { useParams } from 'react-router-dom';
import { dragonoidArticle } from '../../data/dragonoidArticle';
import { beastfolkArticle } from '../../data/beastfolkArticle';
import { merfolkArticle } from '../../data/merfolkArticle';
import DMLogo from '../../images/logos/Dmmarketlogo1024x1024.webp';

const UniqueArticle = () => {
  const { articleId } = useParams();
  const articleSelection = 
    articleId === 'dragonoidArticle' ? dragonoidArticle :
    articleId === 'beastfolkArticle' ? beastfolkArticle :
    merfolkArticle;

  const articleTitle = articleId.replace(/article/i, '').trim();
  const capitalizedArticleTitle = articleTitle.charAt(0).toUpperCase() + articleTitle.slice(1) + ' Article';

  if (!articleSelection) {
    return <p>No Article Found</p>;
  }

  return (
    <main className='Main__container'>
      <p className='Indart__title'>{capitalizedArticleTitle}</p>
      <div className='About__container'>
        {articleSelection.map((article, index) => (
          <div key={index}>
            <p className='About__p'>{article.content}</p>
          </div>
        ))}
        <div className='About__img_container'>
          <img className='About__img' src={DMLogo} alt="DMLogo" width='1024' height='1024' />
        </div>
      </div>
    </main>
  );
};

export default UniqueArticle;
