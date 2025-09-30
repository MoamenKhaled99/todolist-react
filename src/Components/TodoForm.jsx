import React, { useState } from "react";
import "../Styles/TodoForm.css";

const TodoForm = ({ setTodos, todos }) => {
	const [text, setText] = useState("");
	const [status, setStatus] = useState("todo");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		const dateCreated = new Date().toISOString();
		fetch('http://192.168.1.221:5000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, status, dateCreated })
		})
		.then(res => res.json())
		.then(newTodo => {
			setTodos([...todos, newTodo]);
		});
		setText("");
		setStatus("todo");
	};

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter todo..."
				required
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<select value={status} onChange={e => setStatus(e.target.value)}>
				<option value="todo">todo</option>
				<option value="In progress">In progress</option>
				<option value="done">done</option>
			</select>
			<button type="submit">Add Todo</button>
		</form>
	);
};

export default TodoForm;
