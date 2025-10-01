import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useTodo = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [localTodos, setLocalTodos] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  useEffect(() => {
    if (data) setLocalTodos(data);
  }, [data]);

  const addTodo = ({ text, status }) => {
    const dateCreated = new Date().toISOString();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, status, dateCreated }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setLocalTodos((prev) => [...prev, newTodo]);
      });
  };

  const deleteTodo = (id) => {
    const todo = localTodos.find((todo) => todo.id === id);
    if (todo.status === "In progress") {
      toast.error("Cannot delete a todo that is In progress.");
      return;
    }
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    });
  };

  const updateTodo = (id, updatedFields) => {
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...localTodos.find((todo) => todo.id === id),
        ...updatedFields,
      }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setLocalTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      });
  };

  return {
    data,
    localTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    isPending,
    error,
  };
};

export default useTodo;
