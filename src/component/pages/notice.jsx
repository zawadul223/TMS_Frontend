import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
// import './notice.css'; // Import the Notice CSS file
import { Card } from 'react-bootstrap';

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch data from the API using fetch
    fetch('http://localhost:8080/batch/notice/getNotices/1')
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  return (
    <div>
      
      <Container>
      <h1>All Notices</h1>
      {notices.map((notice, index) => (
      <Card style={{ width: '48rem' }} className='mt-4'>
        <Card.Body >
          <Row xs={12} className='box-shadow'>
            <Col >
              <h6 style={{fontStyle:'italic'}} >{notice.trainerName}</h6>
              <p>{notice.notice}</p>
            </Col>
            <Col style={{color:"grey"}} className='text-end'>
              {notice.time}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      ))}
      </Container>
      
    </div>
  );
};

export default Notice;
