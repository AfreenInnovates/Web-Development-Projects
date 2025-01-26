import { useState } from 'react'

export function TodoCard(props) {
  const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditTodo } = props
  const [isEditing, setIsEditing] = useState(false)
  const [newInput, setNewInput] = useState(todo.input)

  return (
    <div className="card todo-item">
      {isEditing ? (
        <input
          value={newInput}
          onChange={(e) => setNewInput(e.target.value)}
          onBlur={() => {
            handleEditTodo(todoIndex, newInput)
            setIsEditing(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEditTodo(todoIndex, newInput)
              setIsEditing(false)
            }
          }}
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setIsEditing(true)}>{todo.input}</p>
      )}
      <div className="todo-buttons">
        {isEditing ? (
          <button
            onClick={() => {
              handleEditTodo(todoIndex, newInput)
              setIsEditing(false)
            }}
          >
            <h6>✔</h6>
          </button>
        ) : (
          <>
            <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.complete}>
              <h6>Done</h6>
            </button>
            <button onClick={() => handleDeleteTodo(todoIndex)}>
              <h6>Delete</h6>
            </button>
            <button onClick={() => setIsEditing(true)}>
              <h6>Edit</h6>
            </button>
          </>
        )}
      </div>
    </div>
  )
}