// pages/completed.js
import React, { useEffect, useState } from 'react';
import TodoList from '@/components/TodoList';
import { Container, Row, Col } from 'react-bootstrap';

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      const res = await fetch('/api/tasks');
      const allTasks = await res.json();
      const filtered = allTasks.filter(task => task.status === 'completed');
      setCompletedTasks(filtered);
    };
    fetchCompleted();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>✅ Completed Tasks</h3>
          <TodoList
            tasks={completedTasks}
            handleDelete={() => {}}
            handleStatusChange={() => {}}
            handleEditTask={() => {}}
          />
        </Col>
      </Row>
    </Container>
  );
}
