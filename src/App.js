import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';



function App() {
  // const [count, setCount] = React.useState(0);


  // const plus = () => {
  //     setCount(count + 1)
  // }

  // const minus = () =>{
  //   setCount(count - 1)
  // }
  
  // return(
  //   <div className="">
  //      <h1>{count}</h1>
  //   <button onClick={plus}>+</button>
  //   <button onClick={minus}>-</button>
  //  </div>
  // );
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() =>{
    fetch('https://672b25ec976a834dd025cf71.mockapi.io/items')
    .then((res) =>  {
    return res.json();
  })
  .then((json) => {
    setItems(json);
      });
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer item={cartItems} onClose = {() => setCartOpened(false)} />}
      <Header onClickCart = {() => setCartOpened(true)}/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>


        <div className="d-flex flex-wrap">
        {items.map((obj) => (
          <Card
          title={obj.title}
          price={obj.price}
          imgerUrl={obj.imgerUrl}
          onFavorite={() => console.log("добавить в закладки")}
          onPlus={()=> console.log("Нажали плюс")}
          />
        ))}
         </div>
        </div>
      </div>

  );
}
export default App;