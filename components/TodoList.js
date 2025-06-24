import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const TodoList = ({ tasks, handleDelete }) => {
  return (
    <ListGroup className="mt-4">
      {tasks.map((task) => (
        <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
          <div>
            <div>{task.task}</div>
            <small className="text-muted">{new Date(task.createdAt).toLocaleString()}</small>
          </div>
          <Button variant="danger" size="sm" onClick={() => handleDelete(task._id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
