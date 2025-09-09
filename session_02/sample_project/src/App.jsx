import './App.css';
import UseStateExample from './UseStateExample.jsx';
import PropsExample from './PropsExample.jsx';
import DataListExample from './DataListExample.jsx';
import IfElseExample from './IfElseExample.jsx';
import ImageExample from './ImageExample.jsx';

function App() {
  return (
    <div>
      <h1>React Learning Examples</h1>
      
     

      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <PropsExample 
          title="Welcome to React!" 
          message="This is an example of passing props to components" 
          isVisible={true} 
        />
      </div>


      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <IfElseExample show={true} />
      </div>

      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <IfElseExample show={false} />
      </div>

      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <ImageExample />
      </div>


      
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <DataListExample />
      </div>

       <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <UseStateExample />
      </div>
    </div>
  );
}

export default App
