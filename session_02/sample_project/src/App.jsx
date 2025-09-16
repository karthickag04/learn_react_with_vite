import UseStateExample from './UseStateExample.jsx';
import PropsExample from './PropsExample.jsx';
import DataListExample from './DataListExample.jsx';
import IfElseExample from './IfElseExample.jsx';
import ImageExample from './ImageExample.jsx';
import EventHandlingExample from './EventHandlingExample.jsx';
import FormHandlingExample from './FormHandlingExample.jsx';
import UseEffectExample from './UseEffectExample.jsx';
import StylingApproachesExample from './StylingApproachesExample.jsx';
import StyleUsageExample from './StyleUsageExample.jsx';

function App() {
  return (
    <div>
      <h1>React Learning Examples</h1>

      {/* Keep examples minimal and unstyled; styling is shown only in styling sessions */}
      <h2>useState</h2>
      <UseStateExample />
      <hr />

      <h2>Props</h2>
      <PropsExample 
        title="Welcome to React!" 
        message="This is an example of passing props to components" 
        isVisible={true} 
      />
      <hr />

      <h2>Lists (map)</h2>
      <DataListExample />
      <hr />

      <h2>Conditional Rendering</h2>
      <IfElseExample show={true} />
      <IfElseExample show={false} />
      <hr />

      <h2>Images</h2>
      <ImageExample />
      <hr />

      <h2>Events</h2>
      <EventHandlingExample />
      <hr />

      <h2>Forms</h2>
      <FormHandlingExample />
      <hr />

      <h2>Effects</h2>
      <UseEffectExample />
      <hr />

      <h2>Styling Sessions</h2>
      <StylingApproachesExample />
      <StyleUsageExample />
    </div>
  );
}

export default App
