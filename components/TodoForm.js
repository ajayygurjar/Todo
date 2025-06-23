import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import TodoList from './TodoList';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>To-Do List</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Control
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Add Task
            </Button>
          </Form>
          <TodoList handleDelete={handleDelete} tasks={tasks}/>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
