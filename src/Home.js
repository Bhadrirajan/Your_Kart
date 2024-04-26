import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchcategories,
  onCategorySelected,
  setQuery,
  setFilter,
  setFilterAndQuery,
  setSearchByQuery,
} from "./CartSlice";
import Card from "./Components/Card";
import { useNavigate } from "react-router-dom";
import Button from "./Components/Button";

function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.CartSlice.items);
  const category = useSelector((state) => state.CartSlice.category);
  const query = useSelector((state) => state.CartSlice.query);
  const filter = useSelector((state) => state.CartSlice.filter);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchcategories());
    if (query === "" && filter === "") {
      dispatch(fetchProducts());
    } else if (query !== "" && filter !== "") {
      dispatch(setFilterAndQuery());
    } else if (query === "" && filter !== "") {
      dispatch(onCategorySelected(filter));
    } else if (query !== "" && filter === "") {
      dispatch(setSearchByQuery());
    }
  }, [query, filter]);

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
  };
  const onSelect = (category) => {
    dispatch(setFilter(category));
  };
  return (
    <div>
      {
        <div>
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={onSearch}
          ></input>
          {category?.map((category, i) => {
            return (
              <Button name={category} onClick={() => onSelect(category)} key={i}></Button>
            );
          })}
          <Button name={"Your Cart"} onClick={() => navigate("CartDetails")}></Button>
          <Button name={"Favorite"} onClick={() => navigate("Favorites")}></Button>
          {items?.map((item) => {
            return <Card props={item} key={item.id} />;
          })}
        </div>
      }
    </div>
  );
}

export default Home;
