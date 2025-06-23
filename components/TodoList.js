import React from 'react'
import {  Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

const TodoList = (props) => {
  return (
    <>
     <ListGroup className="mt-4">
            {props.tasks.map((t, i) => (
              <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                {t}
                <Button variant="danger" size="sm" onClick={() => props.handleDelete(i)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        
    </>
  )
}

export default TodoList