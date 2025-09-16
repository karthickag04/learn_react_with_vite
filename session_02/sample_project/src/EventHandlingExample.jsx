import { useState } from 'react';

function EventHandlingExample() {
  const [message, setMessage] = useState('No event triggered yet');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [keyPressed, setKeyPressed] = useState('');
  const [clickCount, setClickCount] = useState(0);

  // Click event handler
  const handleClick = () => {
    setClickCount(clickCount + 1);
    setMessage('Button clicked!');
  };

  // Double click event handler
  const handleDoubleClick = () => {
    setMessage('Button double-clicked!');
  };

  // Mouse hover event handlers
  const handleMouseEnter = () => {
    setMessage('Mouse entered the button area');
  };

  const handleMouseLeave = () => {
    setMessage('Mouse left the button area');
  };

  // Mouse move event handler
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
    // console.log(event);
  };

  // Keyboard event handler
  const handleKeyDown = (event) => {
    setKeyPressed(event.key);
    setMessage(`Key pressed: ${event.key}`);
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Form submitted successfully!');
  };

  return (
    <div>
      <h2>Event Handling Examples</h2>
      
      <div>
        <h3>Click Events:</h3>
        <button 
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Click me (Count: {clickCount})
        </button>
      </div>

      <div>
        <h3>Mouse Movement:</h3>
        <div 
          onMouseMove={handleMouseMove}
        >
          Move mouse here
          <br />
          Position: X: {mousePosition.x}, Y: {mousePosition.y}
        </div>
      </div>

      <div>
        <h3>Keyboard Events:</h3>
        <input
          type="text"
          placeholder="Type something..."
          onKeyDown={handleKeyDown}
        />
        <p>Last key pressed: <strong>{keyPressed}</strong></p>
      </div>

      <div>
        <h3>Form Submission:</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter some text"
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>

      <div>
        <strong>Event Message:</strong> {message}
      </div>
    </div>
  );
}

export default EventHandlingExample;
