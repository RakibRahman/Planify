import "./../styles/TaskItem.css";
import { FcRefresh, FcEmptyTrash } from "react-icons/fc";
function TaskItem({
  items,
  checkHandler,
  deleteHandler,
  editHandler,
  textArea,
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id.toString()}>
          <span>
            <input
              type="checkbox"
              checked={item.checked}
              id={item.id}
              onChange={() => checkHandler(item.id)}
            />
            <label
              style={{ color: "whitesmoke" }}
              className={item.checked ? "active" : "label"}
            >
              {item.task}
              <br />
              <span style={{ fontSize: "12px", color: "#f0096e" }}>
                📆{item.updated}
              </span>
            </label>
          </span>
          <div>
            <button className="del-btn" onClick={() => deleteHandler(item.id)}>
              <FcEmptyTrash />
            </button>

            <button className="edit-btn" onClick={() => editHandler(item.id)}>
              <FcRefresh />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskItem;
