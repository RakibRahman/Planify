import React, { useEffect, useRef } from "react";
import { FcAddDatabase } from "react-icons/fc";
function AddItem({ newTask, setNewTask, onSubmitHandler }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.2rem",
      }}
    >
      <label htmlFor="newTask">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add New Plan..."
          name="newTask"
          id="newTask"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
      </label>

      <button
        className="addBtn"
        type="submit"
        aria-label="Add New Plan..."
        onClick={() => inputRef.current.focus()}
      >
        <FcAddDatabase />
      </button>
    </form>
  );
}

export default AddItem;
