import styles from './Card.module.scss';
import React from 'react';

function Card(props) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onClickPlus = () =>{
      setIsAdded(!isAdded);
    };

    React.useEffect(() =>{
      console.log("Переменная изменилась")
    }, [isAdded])

    return (
      <div className={styles.card}>
        <div className={styles.favorite} onClick={props.onFavorite} >
          <img src="/img/unliked.svg" alt="Unliked" />
        </div>
        <img width={133} height={112} src={props.imgerUrl} alt="Sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{props.price}</b>
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

