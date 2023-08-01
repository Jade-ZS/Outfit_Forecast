import './ResultContainer.css';
import Result from '../Result/Result';

export default function ResultContainer({isValid, result}) {
  return (
    <div className='result-container'>
      {isValid ? <Result result={result}/> : <p>Invalid Address!!!</p>}
    </div>
  )
}