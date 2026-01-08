import { useState } from 'react';

function UseStateExample() {
  let [checkStatus, setCheckStatus] = useState(false);

  function handleClick() {
    setCheckStatus(true);
  }

  return (
    <div>
      <h2>useState Example</h2>
      {checkStatus && <h3>Button was clicked! State updated.</h3>}
      <button onClick={handleClick}>Click me to change state</button>
    </div>
  );
}

export default UseStateExample;
