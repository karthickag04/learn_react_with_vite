function DataListExample() {
  const dataList = [
    { name: "karthick", age: 22, location: "Trichy" },
    { name: "karthick ag", age: 24, location: "Trichy" },
    { name: "raguvaran", age: 22, location: "chennai" }
  ];

  return (
    <div>
      <h2>Data List with Map Example</h2>
      <ul>
        {dataList.map((user, i) => (
          <li key={i}>
            Name: {user.name}, Age: {user.age}, Location: {user.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataListExample;
