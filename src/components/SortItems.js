import React from "react";

function SortItems({ items, setItems }) {
  const onChangeSort = (e) => {
    if (e.target.value === "a-z") {
      const taskList = [...items].sort((a, b) => {
        if (a.task > b.task) return 1;
        return 0;
      });
      setItems(taskList);
    }
    if (e.target.value === "z-a") {
      const taskList = [...items].sort((a, b) => {
        if (a.task < b.task) return 1;
        return 0;
      });
      setItems(taskList);
    }
    if (e.target.value === "completed") {
      const taskList = [...items].sort((a, b) => b.checked - a.checked);
      setItems(taskList);
    }
    if (e.target.value === "uncompleted") {
      const taskList = [...items].sort((a, b) => a.checked - b.checked);
      setItems(taskList);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <select
        className="sortItems"
        name="sortTask"
        id="sortTask"
        onChange={onChangeSort}
      >
        <option value="sort">Sort By...</option>
        <option value="a-z">↗ A-Z</option>
        <option value="z-a">↖ Z-A</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </form>
  );
}

export default SortItems;
