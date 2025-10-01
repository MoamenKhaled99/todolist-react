import { useState, useEffect } from "react";

const usePagination = (todos, filter, search, pageSize = 10) => {
  const [page, setPage] = useState(1);

  const filteredTodos = todos
    .filter((todo) => (filter ? todo.status === filter : true))
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / pageSize));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedTodos = filteredTodos.slice(start, end);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages === 0 ? 1 : totalPages);
    }
    if (paginatedTodos.length === 0 && page > 1) {
      setPage(totalPages);
    }
  }, [filteredTodos.length, totalPages, page, paginatedTodos.length]);

  return [page, setPage, paginatedTodos, totalPages, filteredTodos];
};

export default usePagination;
