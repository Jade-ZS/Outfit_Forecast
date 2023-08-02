import './ResultContainer.css';
import Result from '../Result/Result';
import AlertBox from '../AlertBox/AlertBox';

export default function ResultContainer({isValid, result}) {
  return (
    <div className='result-container'>
      {isValid && <Result result={result}/>}
    </div>
  )
}