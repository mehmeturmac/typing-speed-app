import { createSlice } from '@reduxjs/toolkit';

import wordsjson from '../../words.json';

const wordCount = 30;

const getWords = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const newWords = shuffled.slice(0, num);
  return newWords.map((word) => ({ ...word, status: '' }));
};

export const wordSlice = createSlice({
  name: 'words',
  initialState: {
    items: getWords(wordsjson.words, wordCount),
    keyCount: 0,
    timer: 60,
    lang: 'turkish',
  },
  reducers: {
    keyCounter: (state) => {
      state.keyCount += 1;
    },
    setStatus: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.status = action.payload.status;
    },
    tick: (state) => {
      state.timer -= 1;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { keyCounter, setStatus, tick, setLang } = wordSlice.actions;
export default wordSlice.reducer;
