import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/1.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/2.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/1.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/2.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/1.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/2.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/1.jpg"
// },
// {
//   "title": "Мужские кроссовки Nike Air Max 270",
//   "price": 15600,
//   "imgerUrl": "/img/sneakers/2.jpg"
// },

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
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://673614635995834c8a955930.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://673614635995834c8a955930.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://674b362071933a4e8854c395.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://673614635995834c8a955930.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://673614635995834c8a955930.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try{
      if(favorites.find(favObj => favObj.id == id)){
        axios.delete(`https://674b362071933a4e8854c395.mockapi.io/favorites/${id}`)
      }else{
        const { data } = await axios.post('https://674b362071933a4e8854c395.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(error){
      console.log('Не удалось добавить  в фавориты')
    }
   
  };


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => 
          setCartOpened(false)} onRemove={onRemoveItem} />
        )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              items={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;