import styles from './Card.module.scss';
import React from 'react';

function Card({ id, title, imagerUrl, price, onFavorite, onPlus, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited)

    const onClickPlus = () =>{
      onPlus({ title, imagerUrl, price });
      setIsAdded(!isAdded);
    };

  const onClickFavorite = () =>{
    onFavorite({ id, title, imagerUrl, price });
    setIsFavorite(!isFavorite);
  }

    // React.useEffect(() =>{
    //   console.log(1)
    // }, [isAdded])

    // const [like, setLike] = React.useState(true);
    
    // const onClickLike = () => {
    //   setLike(!like)
    // }

    return (
      <div className={styles.card}>
        <div className={styles.favorite} onClick={onFavorite} >
          <img onClick={onClickFavorite} src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
        </div>
        <img width={133} height={112} src={imagerUrl} alt="Sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}</b>
          </div>
            <img className={styles.plus}  onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg' } alt="Plus" />
        </div>
      </div>
    );
  }
  
  export default Card;




