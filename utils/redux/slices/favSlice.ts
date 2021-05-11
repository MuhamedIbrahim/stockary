import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayOfSimpleProductsReturn, updateFavsParams } from "../../dataTypes";

export const favsFetcher = createAsyncThunk('fetch/favs', async (): Promise<arrayOfSimpleProductsReturn> => {
  if(localStorage.getItem("stockaryFavProds")) {
    return await JSON.parse(localStorage.getItem("stockaryFavProds"));
  } else {
    return [];
  }
});

export const updateFavs = createAsyncThunk('update/favs', async ({product, state, productID}: updateFavsParams): Promise<arrayOfSimpleProductsReturn> => {
  const favProductsCached = await JSON.parse(
    localStorage.getItem("stockaryFavProds") || "[]"
  );
  let updatedFavProducts = [];
  if (state === "add") {
    const productToAdd = {
      id: Date.now(),
      productID,
      image: product.images[0],
      price: product.price,
      salePrice: product.salePrice,
      title: product.title
    };
    updatedFavProducts = [productToAdd, ...favProductsCached];
  } else if (state === "remove") {
    updatedFavProducts = favProductsCached.filter(
      (prod) => prod.productID !== productID
    );
  }
  localStorage.setItem(
    "stockaryFavProds",
    JSON.stringify(updatedFavProducts)
  );
  return updatedFavProducts;
});

const favSlice = createSlice({
  name: 'favSlice',
  initialState: {
    favs: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: builder => {
    //Fetch favs
    builder.addCase(favsFetcher.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(favsFetcher.fulfilled, (state, action) => {
      state.favs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(favsFetcher.rejected, (state) => {
      state.isLoading = false;
    });
    //Updage favs
    builder.addCase(updateFavs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateFavs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favs = action.payload;
    });
    builder.addCase(updateFavs.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const selectAllFavs = state => ({
  favs: state.favs.favs,
  isLoading: state.favs.isLoading
});

export default favSlice.reducer;