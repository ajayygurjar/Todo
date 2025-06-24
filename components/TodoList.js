import React, { useState } from 'react';
import { Button, ListGroup, Badge, Form } from 'react-bootstrap';

const TodoList = ({ tasks, handleDelete, handleStatusChange, handleEditTask }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (task) => {
    setEditId(task._id);
    setEditText(task.task);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = (task) => {
    if (editText.trim() && editText !== task.task) {
      handleEditTask(task._id, editText, task.status);
    }
    cancelEdit();
  };

  return (
    <ListGroup className="mt-4">
      {tasks.map((task) => {
        const isCompleted = task.status === 'completed';
        const isEditing = editId === task._id;

        return (
          <ListGroup.Item
            key={task._id}
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleStatusChange(task._id, task.status)}
            onDoubleClick={() => startEditing(task)}
          >
            <div className="flex-grow-1">
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(task)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(task);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
              ) : (
                <div
                  style={{
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    color: isCompleted ? 'gray' : 'inherit',
                  }}
                >
                  {task.task}{' '}
                  <Badge bg={isCompleted ? 'success' : 'secondary'}>{task.status}</Badge>
                </div>
              )}
              <small className="text-muted d-block">
                {new Date(task.createdAt).toLocaleString()}
              </small>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task._id);
              }}
            >
              Delete
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default TodoList;
