import React from "react";
import "./../styles/EditItem.css";

function EditItem({ edit, setEdit, textArea }) {
  return (
    <form
      className={`editForm ${textArea ? "show" : "hide"}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="editLabel" className="edit">
        Edit Plan
      </label>

      <input
        className="editInput"
        type="text"
        id="edit"
        name="edit"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
      />
    </form>
  );
}

export default EditItem;
