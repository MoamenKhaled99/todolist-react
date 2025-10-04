import { useState } from 'react';
import usePagination from '../Hooks/usePagination';
import Pagination from '../Components/Pagination';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';
import useTodo from '../Hooks/useTodos';
import FilterSelect from '../Components/FilterSelect';
import SearchBar from '../Components/SearchBar';


const Home = () => {
    const { localTodos, addTodo, deleteTodo, updateTodo, isPending, error } = useTodo('http://172.20.10.3:5000/todos');
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");


    const [page, setPage, paginatedTodos, totalPages, filtered] = usePagination(localTodos, filter, search);

    console.log(filtered)

    return (
        <div className="home">
            <TodoForm addTodo={addTodo} todos={localTodos} />
            <div className="controls-wrapper">
                <FilterSelect value={filter} onChange={setFilter} />
                <SearchBar value={search} onChange={setSearch} />
            </div>
            <TodoList
                todos={paginatedTodos}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                title="All todos"
            />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
        </div>
    );
}

export default Home;