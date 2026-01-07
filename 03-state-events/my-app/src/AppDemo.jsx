import React, {useState} from 'react'

const AppDemo = () => {


    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }
  return (
    <div>
        <h1>App Demo Component</h1>
        <h1>Counter : {count}</h1>
        <button onClick={increment}>Increment</button>
    </div>
  )
}

export default AppDemo