import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [todoList, settodoList] = useState([]);

  const addTodoItem = () => {
    if (input.trim() === "") return;
    const item = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false,
    }
    settodoList(prev => [...prev, item]);
    setInput("");
  }

  const handleButtonSubmit = (e) => {
    if (e.key == "Enter") {
      addTodoItem();
    }
  }

  const toggleCompleted = (id) => {
    settodoList(todoList.map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed
        }
      } else {
        return t;
      }
    }))
  }

  const deleteTodo = (id) => {
    settodoList(
      todoList.filter((t) => (t.id !== id))
    )
  }

  return (
    <div>
      <input type="text"
        value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleButtonSubmit}
        placeholder='Enter todo' />
      <button onClick={() => addTodoItem()}>Add</button>
      <ul>
        {todoList.map(t => <li key={t.id} className='list-style'>
          <input type="checkbox" checked={t.completed} onChange={() => toggleCompleted(t.id)} />
          <span className={t.completed ? 'strikeThrough' : ''}>{t.text}</span>
          <button onClick={() => deleteTodo(t.id)}>Delete</button>
        </li>)}
      </ul>
    </div>
  )
}

export default App
