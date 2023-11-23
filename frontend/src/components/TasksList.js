import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Col, Container, Row, Table, Form, Card, CardBody, CardHeader } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TasksList = () => {

  const [task, setTask] = useState([]);
  const selectedColor = (status) => {
    if (status === 'To Do') {
      return "form-select bg-white text-black";
    } else if (status === 'In Progress') {
      return "form-select bg-warning text-white";
    } else {
      return "form-select bg-success text-white";
    }
  }

  useEffect(() => {
    getTask();
  }, [])

  const getTask = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTask(response && response.data);
  }

  const changeTaskStatus = async (e, id) => {
    const status = e.target.value;
    await axios.patch(`http://localhost:5000/tasks/${id}`, {
      status
    });

    e.target.className = selectedColor(status)
    getTask();
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      getTask();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className='mt-5 vh-100'>
      <div>
        <Row>
          <Col md={12}>
            <Card className='py-3'>
              <CardHeader className='bg-white'>
                <h1 className='text-center text-primary'>
                  To Do
                </h1>
              </CardHeader>
              <CardBody>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th className='text-primary pb-3'>No</th>
                      <th className='text-primary pb-3'>Title</th>
                      <th className='text-primary pb-3'>Description</th>
                      <th className='text-center text-primary pb-3'>Status</th>
                      <th className='text-center text-primary pb-3'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task && task.reverse().map((task, idx) => (
                      <tr className='align-middle' key={task.id}>
                        <td>{idx + 1}</td>
                        <td>{task.title}</td>
                        <td width="35%">{task.description}</td>
                        <td className='text-center'>
                          <Form.Select bsPrefix={selectedColor(task.status)} value={task.status} onChange={(e) => { changeTaskStatus(e, task.id) }}>
                            <option className='bg-white text-black' value={'To Do'}>To Do</option>
                            <option className='bg-white text-black' value={'In Progress'}>In Progress</option>
                            <option className='bg-white text-black' value={'Done'}>Done</option>
                          </Form.Select>
                        </td>
                        <td className='text-center'>
                          <Link to={`insert?current=${task.id}`}>
                            <Button variant='warning' className='me-md-3' >
                              <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                            </Button>
                          </Link>
                          <Button variant='danger' onClick={() => deleteTask(task.id)}>
                            <FontAwesomeIcon icon="fa-regular fa-trash-can" /> {''}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row className='d-flex justify-content-end'>
                  <Col md={4} className='text-end'>
                    <Link to={`insert`} className='fw-bold text-light text-decoration-none d-grid gap-2 d-md-block mb-1'>
                      <Button variant="primary fw-bold" size='lg'>
                        + Add New Task
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
