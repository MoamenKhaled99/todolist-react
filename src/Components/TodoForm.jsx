import { useState } from "react";

const TodoForm = ({ addTodo }) => {
	const [text, setText] = useState("");
	const [status, setStatus] = useState("todo");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		const newTodo = { text, status };
		try {
			await addTodo(newTodo);
			setText("");
			setStatus("todo");
		} catch (error) {
			console.error("Failed to add todo:", error);
		}
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
