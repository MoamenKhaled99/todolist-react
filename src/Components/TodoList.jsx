import TodoItem from "./TodoItem";

const Todolist = ({ todos, setTodos, title }) => {
    const handleDelete = (id) => {
        const todo = todos.find(todo => todo.id === id);
        if (todo.status === 'In progress') {
            alert("Cannot delete a todo that is In progress.");
            return;
        }
        fetch(`http://192.168.1.221:5000/todos/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    const handleUpdate = (id, updatedFields) => {
        fetch(`http://192.168.1.221:5000/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todos.find(todo => todo.id === id), ...updatedFields })
        })
            .then(res => res.json())
            .then(updatedTodo => {
                setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
            });
    };

    return (
        <div className="todo-list">
            <h2>{title}</h2>
            <div className="todo-list-header">
                <span className="todo-col-task">Task</span>
                <span className="todo-col-status">Status</span>
                <span className="todo-col-date">Date</span>
                <span className="todo-col-actions"></span>
            </div>
            {todos.length === 0 ? (
                <p>No todos found.</p>
            ) : (
                todos.map((todo) => (
                    <div className="todos-preview todo-list-row" key={todo.id}>
                        <TodoItem todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
                    </div>
                ))
            )}
        </div>
    );
}

export default Todolist;