
import { useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskInput, setTaskInput] = useState('')
  const [filter, setFilter] = useState('All')

  const addTask = () => {
    if (!taskInput.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskInput.trim(),
        completed: false,
      },
    ])

    setTaskInput('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className="app">
      <main className="task-container">
        <header className="header">
          <div className="logo">✓</div>
          <span className="brand">QuickTask</span>
          <span className="tag">MY WORKSPACE</span>
        </header>

        <section className="intro">
          <p className="eyebrow">YOUR DAILY PLANNER</p>
          <h1>Get things <span>done.</span></h1>
          <p className="subtitle">
            Small steps every day lead to big results.
          </p>
        </section>

        <section className="stats">
          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div>
            <span>Pending</span>
            <strong>{tasks.length - completedCount}</strong>
          </div>
        </section>

        <section className="task-section">
          <h2>My Tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>+ Add Task</button>
          </div>

          <div className="filters">
            {['All', 'Pending', 'Completed'].map(item => (
              <button
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✦</div>
                <h3>No tasks here</h3>
                <p>Add a task and make today productive.</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div className="task-item" key={task.id}>
                  <button
                    className={`check ${task.completed ? 'checked' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? '✓' : ''}
                  </button>

                  <span className={task.completed ? 'task-done' : ''}>
                    {task.title}
                  </span>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer>QUICKTASK © 2026 · STAY FOCUSED.</footer>
      </main>
    </div>
  )
}

export default App
