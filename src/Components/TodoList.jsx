import TodoItem from "./TodoItem";
import "react-toastify/dist/ReactToastify.css";


const TodoList = ({ todos, deleteTodo, updateTodo, title }) => {
    const handleDelete = (id) => {
        deleteTodo(id);
    };

    const handleUpdate = (id, updatedFields) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            updateTodo(id, { ...todo, ...updatedFields });
        }
    };

    return (
        <div className="todo-list">
            <h2>{title}</h2>
            <div className="todo-list-header">
                <div className="todo-col-task">Task</div>
                <div className="todo-col-status">Status</div>
                <div className="todo-col-date">Date</div>
                <div className="todo-col-actions"></div>
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

export default TodoList;