import React, { useState } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import './App.css';

function App() {
  const [amount, setAmount] = useState(10);
  const [forces, setForces] = useState([{ x: 0, y: .5 }])

  return (
    <div className="App">
        <div>
            <a>Amount</a>
            <br />
            <input name='amount' type='text' value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        {<P5Wrapper sketch={sketch} amount={amount} forces={forces} />}
    </div>
  );
}

export default App;
