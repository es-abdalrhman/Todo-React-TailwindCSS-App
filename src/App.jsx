import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TodoList from './TodoList';
import TextField from '@mui/material/TextField';
import EditPopUp from './EditPopUp';
import "./edit-popup.css"
// import from "react-router-dom";
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState({});
  const [editingIndex, setEditingIndex] = useState(0);

  const [buttonKey, setButtonKey] = useState(0);
  const [newTask, setNewTask] = useState({ id: 0, title: "", describtion: "", status: 2 });
  const [todoList, setTodoList] = useState([{
    id: 1,
    status: 2,
    title: "task 1",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  },
  {
    id: 5,
    status: 1,
    title: "task 2",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  },
  {
    id: 4,
    status: 2,
    title: "task 3",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  },
  {
    id: 7,
    status: 1,
    title: "task 4",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  },
  {
    id: 2,
    status: 1,
    title: "task 5",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  },
  {
    id: 3,
    status: 2,
    title: "task 6",
    describtion: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid velit quibusdam illum, officiis assumenda id totam nostrum voluptatibus ullam, cupiditate alias magnam necessitatibus sunt non corporis modi repudiandae sit libero?"
  }]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodos && Array.isArray(storedTodos)) {
      setTodoList(storedTodos);
    }
  }, [todoList]);
  function handleTitleChange(newTitle) {
    setNewTask({ ...newTask, title: newTitle });
  }
  function handleDescribtionChange(newDescribtion) {
    setNewTask({ ...newTask, describtion: newDescribtion });
  }
  // edits cancel the edits
  function ignoreEdit() {
    setIsEditing(false);
    setEditingTask({});
    setEditingIndex(0);
  }
  function updateEdits() {
    let updatedList = [];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id !== doneTaskId) {
        updatedList.push(todoList[i]);
      } else {
        updatedList.push({ ...todoList[i], status: 1 });
      }
    }
  }
  localStorage.setItem("hello", "world");
  //                any   ,    1  ,     2
  const buttons = ["All", "done", "waiting"];
  function handleNewTask(newTask) {
    let lastId = 0;
    let len = todoList.length;
    for (let i = 0; i < len; i++) {
      let todoItem = todoList[i];
      lastId = Math.max(lastId, todoItem.id);
    }
    newTask.id = lastId + 1;
    const updatedList = [...todoList, newTask];
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));

  };

  // set the edits 
  function setAllEdits(editedTask, editIndex) {
    setIsEditing(true);
    setEditingTask(editedTask);
    setEditingIndex(editIndex);

  }
  function handleEditTask(editId) {
    let editedTask = {};
    let editIndex = 0;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === editId) {
        editIndex = i;
        editedTask = todoList[i];
      }
    }
    console.log(editedTask);
    setAllEdits(editedTask, editIndex);
  }
  function finishedEditing(editingTask) {
    const updatedList = todoList.map(item => item.id == editingTask.id ? editingTask : item);
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    setIsEditing(false);
  }


  return (
    <div className="App">
      <h1 className='mb-3' id='project-title' style={{ justifySelf: "center", fontSize: "80px" }}>TODO Project</h1>
      <Container maxWidth="md" style={{ display: "flex", justifyContent: "center", translate: "0 0", gap: "5px" }}>
        {buttons.map((button, index) => {
          return (<Button variant={(index === buttonKey) ? "contained" : "outlined"} key={index} onClick={() => { { setButtonKey(index) } }}>{button}</Button>)
        })}
      </Container>
      <Container className='w-full m-2' style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px" }}>
        <TodoList todoList={todoList} buttonKey={buttonKey} updateTodoList={setTodoList} editTask={handleEditTask} />
      </Container>
      <div className='grid grid-cols-1 gap-1 max-w-2xs justify-self-center'>
        <h3 className='text-blue-600 dark:text-sky-400 mb-2'>CREATE A NEW TASK</h3>
        <TextField id="outlined-basic" label="Task title" variant="outlined" className='bg-amber-50 rounded-sm' onChange={e => handleTitleChange(e.target.value)} value={newTask.title} />
        <br />
        <TextField
          className='bg-amber-50 m-2 rounded-sm'
          id="outlined-multiline-static"
          label="Task Describtion"
          multiline
          value={newTask.describtion}
          rows={4}
          onChange={e => handleDescribtionChange(e.target.value)}
        // placeholder="Task Description"
        />
        <Button variant="contained" style={{ display: "flex", justifySelf: "center", width: "fit-content" }}
          onClick={() => {
            handleNewTask(newTask);
            setNewTask({ ...newTask, title: "", describtion: "" });
          }}>add Task</Button>
      </div>
      {isEditing ? <EditPopUp editingTask={editingTask} ignoreEdit={ignoreEdit} setEditingTask={setEditingTask} finishedEditing={finishedEditing} /> : null}
    </div>
  );
}

export default App;
