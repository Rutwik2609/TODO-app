import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);

  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    let newtodos=[
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ];
    setTodo("");
    setTodos(newtodos)
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((todo) => {
      return todo.id === id;
    });
    console.log(index);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    // console.log(newtodos[index])
    setTodos(newtodos);
    saveToLS();
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter((i) => {
      return i.id === id;
    });
    console.log(t[0]);
    setTodo(t[0].todo);

    let newtodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newtodos);
    saveToLS()
  };

  const handleDelete = (e, id) => {
    // let index=todos.findIndex(todo=>{
    //   return todo.id===id
    // })
    // console.log(index)
    // let newtodos=[...todos]
    // // console.log(newtodos[index])
    // newtodos[index]&&newtodos.splice(index,1);
    // setTodos(newtodos)

    // m-2:
    let newtodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newtodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  


  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="container mx-auto bg-gradient-to-r from-red-400 to-blue-500 ... my-4 text-white p-4 rounded-lg w-2/3 min-h-[80vh]">
        {" "}
        <div className="flex w-full justify-center"><h1 className="font-bold text-3xl my-5" >Todo-Your Personal Task Manager</h1></div>
        <div className="AddTodo bg-white rounded-lg my-3 py-2 flex justify-between">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Add a Todo"
            className="text-black w-full rounded-lg "
          />
          <button
            onClick={handleAdd}
            className="bg-orange-400 p-1 rounded-lg hover:font-bold mx-1 disabled:bg-teal-700"
            disabled={todo.length<3}
            
          >
            submit
          </button>
        </div>{" "}

        <input type="checkbox" checked={showFinished} onChange={toggleFinished} />Show Finished

        <h1 className="font-bold text-xl"> Your Todo 's :</h1>
        <div className="Todos">
          {todos.length === 0 && <div>No Todos to display.</div>}

          {todos.map((item) => {
            return (showFinished || !item.isCompleted ) &&(
              <div
                key={item.todo}
                className="Todo flex justify-between bg-slate-700 text-white py-2 rounded-lg my-4"
              >
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons flex gap-2 mx-1">
                  <button
                    onClick={handleEdit}
                    className="bg-slate-600 rounded-md p-1 hover:font-bold text-white"
                    name={item.id}
                  >
                  <FaEdit/>
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-slate-600 rounded-md p-1 hover:font-bold text-white"
                    name={item.id}
                  >
                    <MdDelete/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
