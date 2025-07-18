import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../App";

const UseMemoExample = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Expensive calculation
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    return num * 1000;
  };

  // Memoize the result
  const calculatedValue = expensiveCalculation(count);
  const phone = useContext(AppContext);

  return (
    <div>
      <h3>useMemo Example</h3>
      <h4>Phone : {phone}</h4>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <p>Calculated Value: {calculatedValue}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};

export default UseMemoExample;
