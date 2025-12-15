import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import { SnackbarContext } from "./context/snackbarContext"

import { useTheme } from '@mui/material/styles';
import { green, red, orange, yellow } from "@mui/material/colors";
import { useContext } from 'react';
import "./Todolist.css";
import { useState } from 'react';
// there is a problem in the layout the icons should be in the bottom right corner 
export default function TodoList({ todoList, buttonKey, updateTodoList, editTask }) {
  const { open, setOpen, message, setMessage, handleSnackbarShow } = useContext(SnackbarContext);

  console.log(buttonKey);
  console.log(todoList);
  const theme = useTheme();

  function handleDeleteTask(deletedId) {
    console.log("this is the deleted id :", deletedId);
    let updatedList = [];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id !== deletedId) {
        updatedList.push(todoList[i]);
      }
    }
    updateTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    setMessage("Delete is done");
    handleSnackbarShow();
  }
  function handleDoneTask(doneTaskId) {
    let updatedList = [];
    let wasNotDone = false;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id !== doneTaskId) {
        updatedList.push(todoList[i]);
      } else {
        wasNotDone = todoList[i].status !== 1;
        updatedList.push({ ...todoList[i], status: 1 });
      }
    }
    updateTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    if (wasNotDone) {
      console.log(wasNotDone);
      setMessage("made this task done");
      handleSnackbarShow();
    }
  }

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full text-white p-4 min-h-8" >
        {todoList.map(({ id, title, describtion, status }) => (
          buttonKey === 0 || status === buttonKey ?
            // this is the card tag
            <div key={id} style={{ backgroundColor: theme.palette.primary.main, borderRadius: "10px", padding: "10px", margin: "5px" }}>
              <h3>{title}</h3>
              <p>{describtion}</p>
              <div className="flex gap-3 justify-end" >
                <DeleteOutlineIcon style={{ backgroundColor: red[500], padding: "5px", borderRadius: "50%" }} onClick={() => handleDeleteTask(id)} />
                <EditIcon className='p-1.5 bg-amber-500 rounded-full' onClick={() => editTask(id)} />
                <CheckIcon style={{ backgroundColor: green[500], padding: "5px", borderRadius: "50%" }} onClick={() => handleDoneTask(id)} />
              </div>
            </div>
            : null

        ))}
      </div>
      {/* {console.log(editingTask)} */}

    </>
  );
}
