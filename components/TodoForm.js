import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import TodoList from './TodoList';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task,status }),
    });

    const newTask = await res.json();
    setTasks([newTask, ...tasks]);
    setTask('');
    setStatus('pending');
  };

  const handleDelete = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleStatusChange = async (id, currentStatus) => {
  const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

  await fetch('/api/tasks', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status: newStatus }),
  });

  setTasks((prev) =>
    prev.map((t) =>
      t._id === id ? { ...t, status: newStatus } : t
    )
  );
};


  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>To-Do List</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" block="true">
              Add Task
            </Button>
          </Form>
          <TodoList tasks={tasks} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
