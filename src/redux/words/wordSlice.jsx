import { createSlice } from '@reduxjs/toolkit';

import wordsjson from '../../words.json';

const wordCount = 40;

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
    correct: 0,
    incorrect: 0,
    timer: 60,
    lang: 'turkish',
  },
  reducers: {
    setStatus: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.status = action.payload.status;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    tick: (state) => {
      state.timer -= 1;
    },
    refleshWords: (state) => {
      state.items = getWords(wordsjson.words, wordCount);
    },
    keyCounter: (state) => {
      state.keyCount += 1;
    },
    addCorrect: (state) => {
      state.correct += 1;
    },
    addInCorrect: (state) => {
      state.incorrect += 1;
    },
  },
});

export const { setStatus, setLang, tick, refleshWords, keyCounter, addCorrect, addInCorrect } = wordSlice.actions;
export default wordSlice.reducer;
