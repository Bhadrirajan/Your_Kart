import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, fetchFavoriteData } from "../CartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const Card = (props) => {
  const [ProductCount, setProductCount] = useState(1);
  const cart = useSelector((state) => state.CartSlice.cart);
  const favorite = useSelector((state) => state.CartSlice.favorite);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const IncreaseCartItem = () => {
    setProductCount((prevState) => prevState + 1);
  };
  const DecreaseCartItem = () => {
    setProductCount((prevState) => prevState - 1);
  };
  const AddCart = (Id) => {
    console.log('CART VALUE',cart);
    if (cart.length === 0) {
      dispatch(fetchCartData(Id));
    }
    cart?.map((items) => {
      console.log(items)
      if (items.product.id === Id) {
        alert("Item already in your cart");
      } else {
        dispatch(fetchCartData(Id));
      }
    });
  };
  const AddToFavorite = (Id) => {
    console.log(favorite.length);
    if (favorite.length === 0) {
      dispatch(fetchFavoriteData(Id));
    }
    favorite?.map((items) => {
      if (items.id === Id) {
        alert("Item already in your favorite list..");
      } else {
        dispatch(fetchFavoriteData(Id));
      }
    });
  };
  const { title, category, price, image, id } = props.props;
  return (
    <div style={{ border: "1px solid", display: "flex" }}>
      <div>
        <img
          alt="product"
          src={image}
          style={{ height: "50px", width: "50px" }}
        ></img>
      </div>
      <div>
        <h4>{title}</h4>
        <p>{category}</p>
        <p>{`$${price}`}</p>
      </div>
      {location.pathname === "/CartDetails" ? (
        <div className="btn-group">
          <Button name={"+"} onClick={IncreaseCartItem}></Button>
          <div>{ProductCount}</div>
          {ProductCount > 1 ? (
            <Button name={"-"} onClick={DecreaseCartItem}></Button>
          ) : (
            <Button name={"-"} onClick={DecreaseCartItem} enabled={true}></Button>
          )}
        </div>
      ) : (
        <Button name={"ADD TO CART"} onClick={() => AddCart(id)}></Button>
      )}
      {location.pathname === "/Favorites" ? (
        <></>
      ) : (
        <div>
          <Button
            name={"ADD TO FAVORITES"}
            onClick={() => AddToFavorite(id)}
          ></Button>
          <Button name={"VIEW PRODUCT DETAILS"} onClick={() => navigate(`ProductDetail/${id}`)}></Button>
        </div>
      )}
    </div>
  );
};
export default React.memo(Card);
