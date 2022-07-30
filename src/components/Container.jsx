import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Container() {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(60);
  const [start, setStart] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const words = useSelector((state) => state.words.items);

  console.log(keyCount);

  useEffect(() => {
    if (time === 1) {
      setStart(false);
    }
    if (start) {
      setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
  }, [time, start]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setKeyCount((keyCount) => keyCount + 1);
    setStart(true);
  };

  return (
    <div className="container">
      <div className="words">
        {words.map((word) => (
          <span className="" key={word.id}>
            {word.turkish}
          </span>
        ))}
      </div>
      <input className="input" disabled={time === 0 && keyCount !== 0} value={input} onChange={handleChange} />
      <span className="time">{time}</span>
      <button className="btn">Retry</button>
    </div>
  );
}

export default Container;
