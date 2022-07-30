import { configureStore } from '@reduxjs/toolkit';

import wordSlice from './words/wordSlice.jsx';

export const store = configureStore({
  reducer: {
    words: wordSlice,
  },
});
