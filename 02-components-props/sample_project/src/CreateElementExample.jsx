import React from "react";

// Simple example using React.createElement
export default function CreateElementExample() {
  // Shortcut alias
  const el = React.createElement;

  // Build elements without JSX
  const heading = el("h1", null, "Hello React without JSX!");
  const paragraph = el("p", null, "This is created using React.createElement.");
  const button = el(
    "button",
    { onClick: () => alert("Button clicked!") },
    "Click Me"
  );

  // Wrap them inside a div
  return el("div", null, heading, paragraph, button);
}
