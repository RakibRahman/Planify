import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./styles/App.css";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import TaskItem from "./components/TaskItem";
import SortItems from "./components/SortItems";
import apiReq from "./api/apiReq";
import EditItem from "./components/EditItem";

function App() {
  const [items, setItems] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState("");
  const [textArea, setTextArea] = useState(false);
  // const API_URL = `http://localhost:3500/items`;
  const API_URL = `https://planify-api.herokuapp.com/items`;

  useEffect(() => {
    const left = [...items].filter((item) => item.checked === false);
    document.title = `Planify || ${left.length} ${
      left.length === 1 ? " Plan" : " Plans"
    } To Complete`;
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("fetching data is interrupted");
        const tasks = await response.json();
        console.log(tasks);
        setItems(tasks);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  //! toggle checked status
  const checkHandler = async (id) => {
    const taskList = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(taskList);

    const itemsUpdated = taskList.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: itemsUpdated[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiReq(reqUrl, updateOptions);
    if (result) setError(result);
  };

  //! delete item from task list
  const deleteHandler = async (id) => {
    const taskList = items.filter((item) => item.id !== id); //return false
    setItems(taskList);

    const delOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiReq(reqUrl, delOptions);
    if (result) setError(result);
  };
  //! Add item to task list
  const addTask = async (task) => {
    const newTask = {
      id: uniqid(),
      checked: false,
      task,
      updated: new Date().toDateString(),
    };
    const taskList = [...items, newTask];
    setItems(taskList);
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    };
    const result = await apiReq(API_URL, postOptions);
    if (result) setError(result);
  };

  //! edit task
  const editHandler = async (id) => {
    const selectedTask = [...items].find((item) => item.id === id);
    setEdit(selectedTask.task);

    const taskList = [...items].map((item) => {
      if (item.id === id) {
        item.task = edit;
      }
      return item;
    });

    setItems(taskList);
    setTextArea(!textArea);

    const itemsUpdated = taskList.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: itemsUpdated[0].task }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiReq(reqUrl, updateOptions);
    if (result) setError(result);
  };

  //! on form submit
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newTask === null || newTask === undefined || newTask === "") return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="App">
      <h1> Planify </h1>

      {!textArea && (
        <AddItem
          onSubmitHandler={onSubmitHandler}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      )}
      {!textArea && (
        <SearchItem
          search={search}
          setSearch={setSearch}
          set
          Items={setItems}
        />
      )}
      {!textArea && <SortItems items={items} setItems={setItems} />}

      <EditItem edit={edit} setEdit={setEdit} textArea={textArea} />

      <main>
        {loading && <p className="loading">Loading.....</p>}
        {error && <p className="err">{`Error: ${error}`}</p>}
        {!error && !loading && (
          <TaskItem
            items={items.filter((item) =>
              item.task.toLowerCase().includes(search.toLowerCase())
            )}
            checkHandler={checkHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            textArea={textArea}
            setTextArea={setTextArea}
          />
        )}
      </main>
      {!error && (
        <footer className="total">
          Total {items.length}
          {items.length === 1 || items.length === 0 ? " Plan" : " Plans"}
        </footer>
      )}
    </div>
  );
}

export default App;
