import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./edit-popup.css"
import { useState } from 'react';
export default function EditPopUp({ editingTask, ignoreEdit, setEditingTask, finishedEditing }) {
    const [editingValue, setEditingValue] = useState({ id: editingTask.id, title: editingTask.title, describtion: editingTask.describtion,status:editingTask.status });

    console.log("the edited task", editingTask);
    return (
        <>
            <div className="pop-back">
                <div className='popup' style={{ backgroundColor: "white", padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField id="outlined-basic" label="title" variant="outlined" value={editingTask.title} onChange={(e) => { setEditingValue({ ...editingValue, "title": e.target.value });  setEditingTask({ ...editingValue, "title": e.target.value })  }} />
                    <TextField
                        id="outlined-multiline-static"
                        label="describtion"
                        multiline
                        rows={4}
                        // defaultValue={editingTask.describtion}
                        value={editingTask.describtion}
                        onChange={(e) => { setEditingValue({ ...editingValue, "describtion": e.target.value }); setEditingTask({ ...editingValue, "describtion": e.target.value }) }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button variant="contained" style={{ backgroundColor: "red" }} onClick={() => ignoreEdit()}>cancel</Button>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={() => { finishedEditing(editingValue) }}>Edit</Button>
                    </div>
                </div>
            </div>
        </>
    )
}