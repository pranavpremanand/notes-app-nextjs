import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.notes = action.payload;
    },
    addItem: (state, action) => {
      state.notes = [action.payload, ...state.notes];
    },
    updateItem: (state, action) => {
      state.notes = state.notes.map((post) => {
        if (action.payload.id === post.id) {
          post.note = action.payload.note;
        }
        return post;
      });
    },
    deleteItem: (state, action) => {
      state.notes = state.notes.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem } = noteSlice.actions;
export default noteSlice.reducer;
