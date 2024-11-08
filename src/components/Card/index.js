import styles from './Card.module.scss';
import React from 'react';

function Card({ title, imagerUrl, price, onFavorite, onPlus }) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onClickPlus = () =>{
      onPlus({ title, imagerUrl, price });
      setIsAdded(!isAdded);
    };

    React.useEffect(() =>{
      console.log("Переменная изменилась")
    }, [isAdded])

    return (
      <div className={styles.card}>
        <div className={styles.favorite} onClick={onFavorite} >
          <img src="/img/unliked.svg" alt="Unliked" />
        </div>
        <img width={133} height={112} src={imagerUrl} alt="Sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}</b>
          </div>
            <img 
            className={styles.plus} 
            onClick={onClickPlus} 
            src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg' } 
            alt="Plus" 
            />
        </div>
      </div>
    );
  }
  
  export default Card;

