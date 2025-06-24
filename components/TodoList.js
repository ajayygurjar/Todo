import React from 'react';
import { Button, ListGroup, Badge } from 'react-bootstrap';

const TodoList = ({ tasks, handleDelete, handleStatusChange }) => {
  return (
    <ListGroup className="mt-4">
      {tasks.map((task) => {
        const isCompleted = task.status === 'completed';
        return (
          <ListGroup.Item
            key={task._id}
            className="d-flex justify-content-between align-items-center"
            onClick={() => handleStatusChange(task._id, task.status)}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <div
                style={{
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  color: isCompleted ? 'gray' : 'inherit',
                }}
              >
                {task.task}{' '}
                <Badge bg={isCompleted ? 'success' : 'secondary'}>
                  {task.status}
                </Badge>
              </div>
              <small className="text-muted">{new Date(task.createdAt).toLocaleString()}</small>
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
