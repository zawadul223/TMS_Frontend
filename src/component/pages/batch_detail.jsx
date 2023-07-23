import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';

const BatchDetails = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [batchData, setBatchData] = useState(null);

  const handleInputChange = (event) => {
    setBatchNumber(event.target.value);
  };

  const handleFetchBatchDetails = () => {
    if (!batchNumber) {
      return;
    }

    fetch(`http://localhost:8080/batch/details/${batchNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setBatchData(data);
      })
      .catch((error) => {
        console.error('Error fetching batch details:', error);
      });
  };

  return (
    <div>
      <h1>Batch Details</h1>
      <Form.Control
        type="text"
        placeholder="Enter Batch Number"
        value={batchNumber}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleFetchBatchDetails();
          }
        }}
        size="sm" // Add this to make the text area smaller
      />
      <br />
      {batchData && (
        <div>
          <h2>{batchData.batchName}</h2>
          <p>
            Start Date: {batchData.startDate} | End Date: {batchData.endDate}
          </p>

          <h3>Trainees</h3>
          <ul>
            {batchData.traineeNames.map((trainee, index) => (
              <li key={index}>{trainee}</li>
            ))}
          </ul>

          <h3>Course Details</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Trainer</th>
              </tr>
            </thead>
            <tbody>
              {batchData.courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.startDate}</td>
                  <td>{course.endDate}</td>
                  <td>{course.trainerNames.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BatchDetails;
