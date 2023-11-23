import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row, Card, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TasksCreate = () => {

  const [current, setCurrent] = useState(0);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate();
  const submitTask = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    try {

      if(current == 0){
        await axios.post('http://localhost:5000/tasks', {
          title,
          description,
          status: "To Do"
        });
      } else {
        await axios.patch(`http://localhost:5000/tasks/${current}`, {
          title,
          description
        });
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let query = window.location.search.substring(1);
    if(query) { 
      let id = query.split("&")[0].split("=")[1];
      if(id) {
        setCurrent(id);
        (async () => {
          const response = await axios.get(`http://localhost:5000/tasks/${id}`);
          if(response && response.data) {
            titleRef.current.value = response.data.title;
            descriptionRef.current.value = response.data.description;
          }
        })();
      }
    }
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);


  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} xs={12}>
          <Link to={"/"} className='text-light text-decoration-none d-grid gap-2 d-md-block mb-4'>
            <Button variant='primary' size='lg' className='fw-bold'>
              <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /> {''}
              Back
            </Button>
          </Link>
          <Card className="shadow">
            <CardBody>
              <div className="mb-3 mt-4">
                <h1 className="fw-bold mb-2 text-uppercase text-primary">To Do List</h1>
                <p className="fst-italic mb-4">Input your newest task!</p>
                <Form onSubmit={submitTask}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" ref={titleRef} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter description" rows={4} ref={descriptionRef} />
                  </Form.Group>
                  <Button variant="outline-primary" type="submit" className='fw-bold'>
                    Submit
                  </Button>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
