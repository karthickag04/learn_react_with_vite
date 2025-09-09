function IfElseExample({ show }) {
  if (!show) {
    return (
      <div>
        <h2>If-Else Rendering Example</h2>
        <h3>No data available</h3>
        <p>This content is shown when 'show' prop is false</p>
      </div>
    );
  }

  return (
    <div>
      <h2>If-Else Rendering Example</h2>
      <h3>Data is available!</h3>
      <p>This content is shown when 'show' prop is true</p>
    </div>
  );
}

export default IfElseExample;
