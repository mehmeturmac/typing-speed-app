import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyCounter, setStatus, tick } from '../redux/words/wordSlice';

function Container() {
  const [input, setInput] = useState('');
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);

  const words = useSelector((state) => state.words.items);
  const keyCount = useSelector((state) => state.words.keyCount);
  const timer = useSelector((state) => state.words.timer);
  const lang = useSelector((state) => state.words.lang);

  const dispatch = useDispatch();

  useEffect(() => {
    if (start) setTimeout(() => dispatch(tick()), 1000);
    if (timer === 1) setStart(false);
  }, [start, timer, dispatch]);

  const handleChange = (e) => {
    dispatch(keyCounter());
    dispatch(setStatus({ id: words[index].id, status: 'next' }));

    let word = words[index].turkish;
    if (lang === 'english') word = words[index].english;

    if (e.target.value.includes(' ')) {
      setInput('');
      setIndex(index + 1);
      if (word.includes(input) && word.length === input.length) {
        dispatch(setStatus({ id: words[index].id, status: 'correct' }));
      } else if (!word.includes(input) || word.length !== input.length) {
        dispatch(setStatus({ id: words[index].id, status: 'incorrect' }));
      }
    } else setInput(e.target.value);

    if (keyCount === 0) setStart(true);
  };

  return (
    <div className="container">
      <div className="words">
        {words.map((word) => (
          <span className={word.status} key={word.id}>
            {lang === 'turkish' ? word.turkish : word.english}
          </span>
        ))}
      </div>
      <input className="input" disabled={timer === 0 && keyCount !== 0} value={input} onChange={handleChange} />
      <span className="time">{timer}</span>
      <button className="btn">Retry</button>
    </div>
  );
}

export default Container;
