import { useState, useEffect } from 'react';

function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 1. useEffect with no dependencies - runs on every render
  useEffect(() => {
    console.log('Component rendered or updated');
  });

  // 2. useEffect with empty dependency array - runs only once (componentDidMount)
  useEffect(() => {
    console.log('Component mounted - this runs only once');
    document.title = `React useEffect Examples`;
    
    // Cleanup function (componentWillUnmount)
    return () => {
      console.log('Component will unmount');
      document.title = 'React App'; // Reset title
    };
  }, []);

  // 3. useEffect with dependencies - runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    localStorage.setItem('count', count.toString());
  }, [count]);

  // 4. useEffect for API call simulation
  useEffect(() => {
    if (count === 5) {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      const fetchUser = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
          
          // Simulate random success/failure
          if (Math.random() > 0.3) {
            setUser({
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://via.placeholder.com/100'
            });
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [count]);

  // 5. useEffect for window resize event listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 6. useEffect for timer functionality
  useEffect(() => {
    let interval = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }

    // Cleanup function
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Helper functions
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);

  const startTimer = () => setIsTimerRunning(true);
  const stopTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>useEffect Hook Examples</h2>
      
      {/* Counter Example */}
      <div>
        <h3>1. Counter with useEffect (Check console for logs)</h3>
        <p>Current count: <strong>{count}</strong></p>
        <button onClick={incrementCount}>
          Increment
        </button>
        <button onClick={decrementCount}>
          Decrement
        </button>
        <button onClick={resetCount}>
          Reset
        </button>
        <p>
          Count is saved to localStorage. Try refreshing the page!
        </p>
        {count === 5 && (
          <p>Count reached 5! This will trigger an API call simulation.</p>
        )}
      </div>

      {/* API Call Example */}
      <div>
        <h3>2. API Call Simulation (Triggered when count = 5)</h3>
        {loading && (
          <div>
            <p>Loading user data...</p>
          </div>
        )}
        
        {error && (
          <div>
            <p>Error: {error}</p>
          </div>
        )}
        
        {user && (
          <div>
            <h4>✅ User Data Loaded:</h4>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        )}
        
        {!loading && !user && !error && count !== 5 && (
          <p>Set counter to 5 to trigger API call</p>
        )}
      </div>

      {/* Window Resize Example */}
      <div>
        <h3>3. Window Resize Event Listener</h3>
        <p>Current window width: <strong>{windowWidth}px</strong></p>
        <p>
          Try resizing your browser window to see this value change!
        </p>
      </div>

      {/* Timer Example */}
      <div>
        <h3>4. Timer with useEffect</h3>
        <p>Timer: <strong>
          {formatTime(timer)}
        </strong></p>
        <button 
          onClick={startTimer} 
          disabled={isTimerRunning}
        >
          Start
        </button>
        <button 
          onClick={stopTimer}
          disabled={!isTimerRunning}
        >
          Stop
        </button>
        <button 
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>

      {/* useEffect Summary */}
      <div>
        <h3>useEffect Patterns Demonstrated:</h3>
        <ul>
          <li><strong>No dependencies:</strong> Runs on every render</li>
          <li><strong>Empty array []:</strong> Runs only once (mount/unmount)</li>
          <li><strong>With dependencies [count]:</strong> Runs when dependencies change</li>
          <li><strong>Cleanup functions:</strong> For event listeners and intervals</li>
          <li><strong>Async operations:</strong> API calls and loading states</li>
          <li><strong>Side effects:</strong> DOM manipulation, timers, subscriptions</li>
        </ul>
      </div>
    </div>
  );
}

export default UseEffectExample;
