import "./App.css";
import ProductDetail from "./Components/ProductDetail";
import CartDetails from "./Components/CartDetails";
import Favorites from "./Components/Favorites";
import Home from "./Home";
import {Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="CartDetails" element={<CartDetails/>} />
          <Route path="Favorites" element={<Favorites/>} />
          <Route path="ProductDetail/:id" element={<ProductDetail/>} />
          <Route path="CartDetails/ProductDetail/:id" element={<ProductDetail/>} />
        </Routes>
    </>
  );
}

export default App;
