import { useState } from 'react';

// CSS-in-JS style objects
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  section: {
    marginBottom: '30px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  dangerButton: {
    backgroundColor: '#dc3545',
    color: 'white'
  },
  successButton: {
    backgroundColor: '#28a745',
    color: 'white'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '10px 0'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '200px'
  }
};

function StylingApproachesExample() {
  const [theme, setTheme] = useState('light');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [bgColor, setBgColor] = useState('#f8f9fa');

  // Dynamic styles based on state
  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid #dee2e6'
    },
    dark: {
      backgroundColor: '#343a40',
      color: '#ffffff',
      border: '1px solid #6c757d'
    }
  };

  const sizeStyles = {
    small: { fontSize: '12px', padding: '5px 10px' },
    medium: { fontSize: '16px', padding: '10px 20px' },
    large: { fontSize: '20px', padding: '15px 30px' }
  };

  // Conditional classes simulation
  const getButtonClasses = (variant, active = false) => {
    let classes = 'btn';
    classes += ` btn-${variant}`;
    if (active) classes += ' active';
    return classes;
  };

  return (
    <div style={styles.container}>
      <h2>Styling Approaches in React</h2>

      {/* 1. Inline Styles */}
      <div style={styles.section}>
        <h3>1. Inline Styles</h3>
        <p>Direct style objects applied to elements:</p>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#e7f3ff',
            border: '2px solid #0066cc',
            borderRadius: '10px',
            textAlign: 'center',
            margin: '10px 0'
          }}
        >
          This div uses inline styles
        </div>
        
        <button
          style={{
            ...styles.button,
            ...styles.primaryButton,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hover Effect Button
        </button>
      </div>

      {/* 2. CSS-in-JS with Style Objects */}
      <div style={styles.section}>
        <h3>2. CSS-in-JS with Style Objects</h3>
        <p>Styles defined as JavaScript objects and reused:</p>
        
        <div style={styles.card}>
          <h4>Card Component</h4>
          <p>This card uses predefined style objects.</p>
          
          <button style={{...styles.button, ...styles.successButton}}>
            Success
          </button>
          <button style={{...styles.button, ...styles.dangerButton}}>
            Danger
          </button>
          <button style={{...styles.button, ...styles.secondaryButton}}>
            Secondary
          </button>
        </div>
      </div>

      {/* 3. Dynamic Styles Based on State */}
      <div style={styles.section}>
        <h3>3. Dynamic Styles Based on State</h3>
        <p>Styles that change based on component state:</p>
        
        <div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{...styles.button, ...styles.primaryButton}}
          >
            Toggle Theme: {theme}
          </button>
        </div>

        <div
          style={{
            ...themeStyles[theme],
            padding: '20px',
            margin: '15px 0',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <h4>Themed Container</h4>
          <p>This container changes appearance based on the selected theme.</p>
        </div>
      </div>

      {/* 4. Conditional Styling */}
      <div style={styles.section}>
        <h3>4. Conditional Styling</h3>
        <p>Different styles applied based on conditions:</p>
        
        <div>
          <label>Select size: </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={styles.input}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button
          style={{
            ...styles.button,
            ...styles.primaryButton,
            ...sizeStyles[selectedSize]
          }}
        >
          {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} Button
        </button>
      </div>

      {/* 5. Interactive Styling */}
      <div style={styles.section}>
        <h3>5. Interactive Styling</h3>
        <p>Styles that respond to user interactions:</p>
        
        <div>
          <label>Background Color: </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </div>

        <div
          style={{
            backgroundColor: bgColor,
            padding: '20px',
            margin: '15px 0',
            borderRadius: '8px',
            border: '2px solid #ccc',
            textAlign: 'center',
            color: bgColor === '#ffffff' || bgColor === '#f8f9fa' ? '#333' : '#fff',
            transition: 'all 0.3s ease'
          }}
        >
          Interactive Background Color
        </div>
      </div>

      {/* 6. Styled Components Pattern (Manual) */}
      <div style={styles.section}>
        <h3>6. Component-Based Styling</h3>
        <p>Creating reusable styled components:</p>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <StyledCard title="Card 1" content="This is a reusable card component" variant="primary" />
          <StyledCard title="Card 2" content="Same component, different variant" variant="success" />
          <StyledCard title="Card 3" content="Yet another variant" variant="danger" />
        </div>
      </div>

      {/* 7. Responsive Styling */}
      <div style={styles.section}>
        <h3>7. Responsive Styling (JavaScript-based)</h3>
        <p>Styles that adapt to screen size:</p>
        
        <ResponsiveGrid />
      </div>

      {/* 8. Animation with Inline Styles */}
      <div style={styles.section}>
        <h3>8. CSS Animations with Inline Styles</h3>
        <p>Simple animations using transitions:</p>
        
        <AnimatedBox />
      </div>

      {/* Styling Summary */}
      <div style={{
        ...styles.section,
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6'
      }}>
        <h3>Styling Approaches Summary:</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <li><strong>Inline Styles:</strong> Direct style objects on elements</li>
          <li><strong>CSS-in-JS Objects:</strong> Reusable style objects</li>
          <li><strong>Dynamic Styles:</strong> Styles based on state/props</li>
          <li><strong>Conditional Styling:</strong> Different styles for different conditions</li>
          <li><strong>Interactive Styling:</strong> Styles that respond to user input</li>
          <li><strong>Component-based:</strong> Encapsulated styles in components</li>
          <li><strong>Responsive:</strong> Styles that adapt to screen size</li>
          <li><strong>Animations:</strong> Transitions and transforms</li>
        </ul>
      </div>
    </div>
  );
}

// Reusable Styled Card Component
function StyledCard({ title, content, variant = 'primary' }) {
  const cardVariants = {
    primary: { borderLeft: '4px solid #007bff', backgroundColor: '#f8f9ff' },
    success: { borderLeft: '4px solid #28a745', backgroundColor: '#f8fff9' },
    danger: { borderLeft: '4px solid #dc3545', backgroundColor: '#fff8f8' },
    warning: { borderLeft: '4px solid #ffc107', backgroundColor: '#fffbf0' }
  };

  return (
    <div
      style={{
        ...styles.card,
        ...cardVariants[variant],
        minWidth: '200px',
        maxWidth: '300px'
      }}
    >
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h4>
      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{content}</p>
    </div>
  );
}

// Responsive Grid Component
function ResponsiveGrid() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // This would typically be in useEffect, but keeping it simple for this example
  const getGridColumns = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
    gap: '15px',
    padding: '15px'
  };

  const itemStyle = {
    padding: '20px',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #dee2e6'
  };

  return (
    <div>
      <p>Current columns: {getGridColumns()} (based on window width: {windowWidth}px)</p>
      <div style={gridStyle}>
        <div style={itemStyle}>Grid Item 1</div>
        <div style={itemStyle}>Grid Item 2</div>
        <div style={itemStyle}>Grid Item 3</div>
        <div style={itemStyle}>Grid Item 4</div>
      </div>
    </div>
  );
}

// Animated Box Component
function AnimatedBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotation, setRotation] = useState(0);

  const boxStyle = {
    width: isExpanded ? '200px' : '100px',
    height: isExpanded ? '200px' : '100px',
    backgroundColor: isExpanded ? '#28a745' : '#007bff',
    margin: '20px auto',
    borderRadius: isExpanded ? '50%' : '10px',
    transition: 'all 0.5s ease-in-out',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    transform: `rotate(${rotation}deg)`,
    userSelect: 'none'
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setRotation(rotation + 180);
  };

  return (
    <div>
      <div style={boxStyle} onClick={handleClick}>
        Click me!
      </div>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Click the box to see CSS transitions in action!
      </p>
    </div>
  );
}

export default StylingApproachesExample;
