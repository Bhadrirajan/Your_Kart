import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk("fetchProductDetails", async (Id) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${Id}`
  );
  console.log('fetchProductDetails', response.data)
  return response.data;
});

export const fetchCartData = createAsyncThunk("fetchCartData", async (Id) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${Id}`
  );
  console.log('fetchCartdataiscalled', response.data)
  return response.data;
});

export const fetchFavoriteData = createAsyncThunk("fetchFavoriteData", async (Id) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${Id}`
  );
  console.log('fetchFavoriteData', response.data)
  return response.data;
});

export const fetchcategories = createAsyncThunk("fetchcategories", async () => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return response.data;
});

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  console.log("fetchpdt called");
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

export const onCategorySelected = createAsyncThunk(
  "onCategorySelected",
  async (category) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return response.data;
  }
);

const filterAndQuery = (state) => {
  const { query, filter } = state;
  onCategorySelected(filter);
  state.items = state.items?.filter((item) =>
    item?.title?.toLowerCase().includes(query?.toLowerCase())
  );
};

const searchByQuery = (state) => {
  const { query } = state;
  state.items = state.items?.filter((item) =>
    item?.title?.toLowerCase().includes(query?.toLowerCase())
  );
};

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    items: [],
    category: [],
    query: "",
    filter: "",
    cart:[],
    favorite: [],
    ProductDetails: ""
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFilterAndQuery: (state) => {
      filterAndQuery(state);
    },
    setSearchByQuery: (state) => {
      searchByQuery(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(onCategorySelected.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.cart.push({product: action.payload, quantity: 1});
      })
      .addCase(fetchFavoriteData.fulfilled, (state, action) => {
        state.favorite.push(action.payload);
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.ProductDetails = action.payload;
      })
      ;
  },
});

export const { setQuery, setFilter, setFilterAndQuery, setSearchByQuery } = CartSlice.actions;
export default CartSlice.reducer;
