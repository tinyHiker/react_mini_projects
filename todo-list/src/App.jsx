import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"


export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  const [completed, setCompleted] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    let ts= JSON.parse(localValue)
    let coms = ts.filter(todo => todo.completed)
    return coms
  })

  const [incomplete, setIncomplete] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    let ts= JSON.parse(localValue)
    let incoms = ts.filter(todo => !todo.completed)
    return incoms
  })

  const [choice, setChoice] = useState("regular")



  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
    setCompleted(todos.filter(todo => todo.completed))
    setIncomplete(todos.filter(todo => !todo.completed))
    
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    <div class="content-container">
    <h1 className="header">Todo List</h1>
      <NewTodoForm onSubmit={addTodo} />
      <div class="buttons-group">
      <button onClick = {() => { setChoice('completed')}}>Completed</button>  <button onClick={() => { setChoice('incomplete')}}>Incomplete</button>  <button onClick={() => { setChoice('regular')}}>All</button>
      </div>
      {
          choice === "regular" ? <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> : <span></span>
      }
      {
        choice === "completed" ? <TodoList todos={completed} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> : <span></span>
      }
      {
        choice === "incomplete" ? <TodoList todos={incomplete} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> : <span></span>
        
      }
    </div>
    </>
  )
}
