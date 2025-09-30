import React, { useState } from "react";
import Button from "./Button";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editStatus, setEditStatus] = useState(todo.status);

    const handleUpdate = () => {
        onUpdate(todo.id, { text: editText, status: editStatus });
        setIsEditing(false);
    };

    return (
        <div className="todo-list-header">
            {isEditing ? (
                <>
                    <span className="todo-col-task">
                        <input value={editText} onChange={e => setEditText(e.target.value)} />
                    </span>
                    <span className="todo-col-status">
                        <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                            <option value="todo">todo</option>
                            <option value="in progress">In progress</option>
                            <option value="done">done</option>
                        </select>
                    </span>
                    <span className="todo-col-date">
                        {todo.dateCreated ? new Date(todo.dateCreated).toLocaleString() : ""}
                    </span>
                    <span className="todo-col-actions">
                        <Button type="update" onClick={handleUpdate}>Save</Button>
                        <Button type="default" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </span>
                </>
            ) : (
                <>
                    <span className="todo-col-task">{todo.text}</span>
                    <span className="todo-col-status">{todo.status}</span>
                    <span className="todo-col-date">{todo.dateCreated ? new Date(todo.dateCreated).toLocaleString() : ""}</span>
                    <span className="todo-col-actions">
                        <Button type="edit" onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button type="delete" onClick={() => onDelete(todo.id)}>Delete</Button>
                    </span>
                </>
            )}
        </div>
    );
}

export default TodoItem;