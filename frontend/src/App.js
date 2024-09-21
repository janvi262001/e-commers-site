import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import ProductList from './pages/ProductList';
import CartPage from './pages/CartPage';

function App() {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [cartItems, setCartItems] = useState([]); 
  console.log('cartItems: ', cartItems);

  const handleSort = () => {
    setSortByPrice((prevSort) => !prevSort);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };



  return (
    <Router>
      <NavbarComponent onSort={handleSort} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<ProductList sortByPrice={sortByPrice} searchQuery={searchQuery} addToCart={addToCart}/>} />
        <Route path="/cart" element={<CartPage initialCartItems={cartItems}/>} />
      </Routes>
    </Router>
  );
}

export default App;
