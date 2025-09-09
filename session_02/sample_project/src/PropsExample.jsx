function PropsExample({ title, message, isVisible }) {
  return (
    <div>
      <h2>Props Example</h2>
      <h3>{title}</h3>
      <p>{message}</p>
      {isVisible && <p>This content is visible because isVisible prop is true!</p>}
    </div>
  );
}

export default PropsExample;
