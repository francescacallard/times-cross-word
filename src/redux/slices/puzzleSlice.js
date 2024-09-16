
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCrosswordData = createAsyncThunk(
  'puzzle/fetchCrosswordData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/generate-crossword');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  crosswordData: null,
  isLoading: false,
  error: null,
  crosswordDataLoaded: false,
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {reducers: {
    setSelectedWordId: (state, action) => {
      state.selectedWordId = action.payload;
    },
    setCrosswordData: (state, action) => {
      state.crosswordData = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = { ...state.userInput, ...action.payload };
    },
  },},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCrosswordData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCrosswordData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.crosswordData = action.payload;
        state.crosswordDataLoaded = true;
      })
      .addCase(fetchCrosswordData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedWordId, setCrosswordData, setUserInput } = puzzleSlice.actions;


export default puzzleSlice.reducer;