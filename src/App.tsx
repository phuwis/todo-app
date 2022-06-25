import { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<any>({});
  // const handleChange = (e: any) => {
  //   const map: {[key:string]: string} = e.target;
  //   const { name, value } = e.target;

  //   const output = currentTodo;
  //   output[name] = value;

  //   setCurrentTodo(output);
  // };
  const ct: any = { currentTodo };
  console.log(ct);

  function handleEditInputChange(event: any) {
    setCurrentTodo({ ...currentTodo, text: event.target.value });
    console.log(currentTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(event: any) {
    setTodo(event.target.value);
  }
  function handleFormSubmit(event: any) {
    event.preventDefault();

    if (todo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: todo.trim() }]);
    }
    setTodo("");
  }

  function handleDeleteClick(id: any) {
    const removeItem = todos.filter((todo: any) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleEditClick(todo: any) {
    setIsEditting(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id: any, updatedTodo: any) {
    const updatedItem = todos.map((todo: any) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditting(false);
    setTodos(updatedItem);
  }

  function handleEditFormSubmit(event: any) {
    event.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  return (
    <div>
      <h1>Todos App</h1>
      {isEditting ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            type="text"
            name="editTodo"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          ></input>
          <button type="submit">Update</button>

          <button onClick={() => setIsEditting(false)}>Cancle</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          ></input>
          <button type="submit">Add</button>
        </form>
      )}

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>

            <button onClick={() => handleDeleteClick(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
  // const [name, setName] = useState("");
  // const [list, setList] = useState([""]);
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   list.push(name);
  //   setList(list);
  // };
  // console.log(name);
  // console.log(list);
  // return (
  //   <>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Enter your name:
  //         <input
  //           type="text"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //       </label>
  //       <input type="submit" />
  //     </form>
  //     <ul>
  //       {list.map(function (item) {
  //         return <li key={item}>{item}</li>;
  //       })}
  //     </ul>
  //   </>
  // );
};

export default App;
