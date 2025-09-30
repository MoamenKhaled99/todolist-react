import React, { useState } from 'react';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';
import useTodo from '../Hooks/useTodos';
import FilterSelect from '../Components/FilterSelect';
import SearchBar from '../Components/SearchBar';


const Home = () => {
    const { data: todos, isPending, error } = useTodo('http://192.168.1.221:5000/todos');
    const [localTodos, setLocalTodos] = useState([]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");


    React.useEffect(() => {
        if (todos) setLocalTodos(todos);
    }, [todos]);

    const filteredTodos = localTodos
        .filter(todo => (filter ? todo.status === filter : true))
        .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="home">
            <TodoForm setTodos={setLocalTodos} todos={localTodos} />
            <FilterSelect value={filter} onChange={setFilter} />
            <SearchBar value={search} onChange={setSearch} />
            <TodoList todos={filteredTodos} setTodos={setLocalTodos} title="All todos" />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
        </div>
    );
}

export default Home;