import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

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
 
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://673614635995834c8a955930.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://674b362071933a4e8854c395.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://673614635995834c8a955930.mockapi.io/items');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);


  const onAddToCart = (obj) => {

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://673614635995834c8a955930.mockapi.io/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://673614635995834c8a955930.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };


  const onRemoveItem = (id) => {
    axios.delete(`https://673614635995834c8a955930.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://674b362071933a4e8854c395.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://674b362071933a4e8854c395.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('Не удалось добавить  в фавориты')
    }

  };


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }


  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  }


  return (
    <AppContext.Provider 
    value={{
      items,
      cartItems, 
      favorites, 
      isItemAdded, 
      onAddToFavorite, 
      setCartOpened,
      setCartItems
      }} >
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
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
        </Routes>


        <Routes>
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;