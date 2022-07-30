import { createSlice } from '@reduxjs/toolkit';

import wordsjson from '../../words.json';

const wordCount = 30;

const getWords = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const wordSlice = createSlice({
  name: 'words',
  initialState: {
    items: getWords(wordsjson.words, wordCount),
  },
  reducers: {},
});

export const { addword } = wordSlice.actions;
export default wordSlice.reducer;
