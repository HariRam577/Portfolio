import React, { useState } from "react";

const Task = () => {
  const data = ["Hari", "Ram", "Ramesh", "Suresh", "Harnika", "Nishok"];
  const [searchTerm, setSearchTerm] = useState("");
  const filterItems = data.filter((item) => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <input
        type="text"
        placeholder="Search tearm..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filterItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
