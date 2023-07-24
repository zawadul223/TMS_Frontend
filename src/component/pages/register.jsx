import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';


const TraineeRegistrationPage = () => {
    const [traineeData, setTraineeData] = useState({
        name: '',
        traineePhoto: '',
        gender: '',
        dateOfBirth: '',
        traineeEmail: '',
        traineeContactNo: '',
        degree: '',
        cgpa: '',
        passingYear: '',
        address: '',
        password: '',
    });

    const [traineePhoto, setTraineePhoto] = useState(null);
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const [photoUploadStatus, setPhotoUploadStatus] = useState(false);
    const [traineeId, setTraineeId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraineeData({ ...traineeData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        // Get the selected file from the input
        const file = e.target.files[0];
        setTraineePhoto(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ... (Submit the text data and get the trainee ID as a response)

        fetch('http://localhost:8080/user/register/trainee', {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(traineeData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Trainee registration failed');
      }
    })
    .then((data) => {
      // Extract the traineeId from the response
      const traineeId = data.id;
      console.log('Trainee ID:', traineeId);

      // Construct the photo upload URL with the traineeId
      const photoUploadUrl = `http://localhost:8080/user/photo/trainee/${traineeId}`;

      // Use the FormData API to append the photo and other data
      const formData = new FormData();
      formData.append('file', traineePhoto);
      // Append other data as needed

      // Send the photo upload request
      return fetch(photoUploadUrl, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: formData,
      });
    })
    .then((photoRes) => {
      if (photoRes.ok) {
        // Photo uploaded successfully
        console.log('Photo uploaded successfully');
      } else {
        throw new Error('Photo upload failed');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow" style={{ width: '800px' }}>
                <Card.Title className="text-center mb-4">
                    Trainee Registration
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={traineeData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            {/* <Form.Group controlId="traineePhoto">
                <Form.Label>Trainee Photo</Form.Label>
                <Form.Control
                  type="text"
                  name="traineePhoto"
                  value={traineeData.traineePhoto}
                  onChange={handleChange}
                />
              </Form.Group> */}

                            <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={traineeData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="dateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={traineeData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="traineeEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="traineeEmail"
                                    value={traineeData.traineeEmail}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={traineeData.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="traineeContactNo">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="traineeContactNo"
                                    value={traineeData.traineeContactNo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="degree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="degree"
                                    value={traineeData.degree}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="cgpa">
                                <Form.Label>CGPA</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="cgpa"
                                    value={traineeData.cgpa}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="passingYear">
                                <Form.Label>Passing Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="passingYear"
                                    value={traineeData.passingYear}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="address"
                                    value={traineeData.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                        </Col>
                    </Row>
                    <div>
                        <label htmlFor="traineePhoto">Upload Trainee Photo:</label>
                        <input
                            type="file"
                            id="traineePhoto"
                            name="traineePhoto"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Submit
                    </Button>
                </Form>
                {registrationStatus && (
                    <div className="alert alert-success" role="alert">
                        Registration Successful!
                    </div>
                )}
                {photoUploadStatus && <div>Photo Upload Successful!</div>}

            </Card>
        </Container>
    );
};

export default TraineeRegistrationPage;
