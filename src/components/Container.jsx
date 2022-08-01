import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyCounter, setStatus, tick, refleshWords, addCorrect, addInCorrect } from '../redux/words/wordSlice';

import Result from './Result';

function Container() {
  const [input, setInput] = useState('');
  const [start, setStart] = useState(false); // timer status
  const [index, setIndex] = useState(0); // words index

  // Selectors
  const words = useSelector((state) => state.words.items);
  const keyCount = useSelector((state) => state.words.keyCount);
  const timer = useSelector((state) => state.words.timer);
  const lang = useSelector((state) => state.words.lang);

  const dispatch = useDispatch();

  // Timer
  useEffect(() => {
    if (start) setTimeout(() => dispatch(tick()), 1000);
    if (timer === 1) setStart(false);
  }, [start, timer, dispatch]);

  const handleChange = (e) => {
    dispatch(keyCounter());
    dispatch(setStatus({ id: words[index].id, status: 'next' }));

    let word = lang === 'english' ? words[index].english.toLowerCase() : words[index].turkish.toLowerCase();

    if (e.target.value.includes(' ')) {
      setInput('');

      if (word.includes(input) && word.length === input.length) {
        dispatch(setStatus({ id: words[index].id, status: 'correct' }));
        dispatch(addCorrect());
      } else if (!word.includes(input) || word.length !== input.length) {
        dispatch(setStatus({ id: words[index].id, status: 'incorrect' }));
        dispatch(addInCorrect());
      }

      if (words.length - 1 === index) {
        dispatch(refleshWords());
        setIndex(0);
      } else setIndex(index + 1);
    } else setInput(e.target.value);

    if (keyCount === 0) setStart(true);
  };

  return (
    <div className="container">
      <div className="words">
        {words.map((word) => (
          <span className={word.status} key={word.id}>
            {lang === 'turkish' ? word.turkish.toLowerCase() : word.english.toLowerCase()}
          </span>
        ))}
      </div>
      <input className="input" disabled={timer === 0 && keyCount !== 0} value={input} onChange={handleChange} />
      <span className="timer">{timer}</span>

      {timer === 0 && keyCount !== 0 && <Result />}
    </div>
  );
}

export default Container;
