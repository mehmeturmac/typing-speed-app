import { useSelector } from 'react-redux';

function Result() {
  const keyCount = useSelector((state) => state.words.keyCount);
  const correct = useSelector((state) => state.words.correct);
  const incorrect = useSelector((state) => state.words.incorrect);
  const lang = useSelector((state) => state.words.lang);

  return (
    <div className="result">
      <p className="head">{lang === 'turkish' ? 'Sonuç' : 'Result'}</p>
      <p>
        {lang === 'turkish' ? 'Tuş Vuruşu: ' : 'Key Count: '} {keyCount}
      </p>
      <p className="correct">
        {lang === 'turkish' ? 'Doğru: ' : 'Correct: '} {correct}
      </p>
      <p className="incorrect">
        {lang === 'turkish' ? 'Yanlış: ' : 'Incorrect: '} {incorrect}
      </p>
      <p>
        {lang === 'turkish' ? 'Doğruluk: ' : 'Accuracy: '} %{((correct / (correct + incorrect) || 0) * 100).toFixed(2)}
      </p>
      <button className="btn" onClick={() => window.location.reload()}>
        {lang === 'turkish' ? 'Tekrar Dene' : 'Retry'}
      </button>
    </div>
  );
}

export default Result;
