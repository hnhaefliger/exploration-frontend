import React from "react";

import { Checkbox } from "ui";
import { Size } from "ui";

function App() {
  let colorScheme = localStorage.getItem("color-scheme");
  if (
    colorScheme !== "light" &&
    colorScheme !== "dark" &&
    colorScheme !== "system"
  ) {
    colorScheme = "system";
  }

  if (colorScheme === "system") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      colorScheme = "dark";
    } else {
      colorScheme = "light";
    }
  }

  return (
    <div className="App" data-color-scheme={colorScheme}>
      <Checkbox size={Size.Small} checked={false} />
    </div>
  );
}

export default App;
