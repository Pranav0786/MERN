
import { useState } from 'react';
import './App.css';

function App() {

  const[count,setCount] = useState(0) ;
  function decreaseHandler(){
    setCount(count-1) ;
  }
  function increaseHandler(){
    setCount(count+1) ;
  }
  function resetHandler(){
    setCount(0) ;
  }

  return (
    <div className='app'>
        <div className='incer-decre'>
          Increment && Decrement
        </div>
        <div className='middle-part'>
          <button onClick={decreaseHandler} className='decrease-button' >-</button>
          <div className='count-part'>
            {count}
          </div>
          <button onClick={increaseHandler} className='increase-button' >+</button>
        </div>
        <div>
          <button onClick={resetHandler} className='reset-button' >Reset</button>
        </div>
    </div>
  );
}

export default App;
