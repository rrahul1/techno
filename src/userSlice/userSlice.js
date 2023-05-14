import {createSlice} from "@reduxjs/toolkit";
import { initialData as initialState } from "./initialState";

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers :{
          searchDataByName: (state, action) => {
            state.filterData = state.userStore?.filter((item) =>
              item.first_name.toLowerCase().includes(action.payload.toLowerCase())
            );
          },
          handlePreviousPage: (state) => {
            return{
              ...state,
              currentPage: state.currentPage -1
            }
          },
          handleNextPage: (state) => {
            return{
              ...state,
              currentPage: state.currentPage + 1
            };
          },
    }
})


export const {
    searchDataByName,
    handlePreviousPage,
    handleNextPage,
  } = userSlice.actions;


  
  export default userSlice.reducer;