import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';

const ClassroomPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [classroomId, setClassroomId] = useState('');
    const [postMessage, setPostMessage] = useState('');
    const [posts, setPosts] = useState([]);
  
    // Get trainerId from local storage
    const trainerId = localStorage.getItem('id');
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleCreatePost = () => {
      const postModel = {
        message: postMessage,
      };
  
      // Send the post data to the API
      fetch(`http://localhost:8080/classroom/post/${classroomId}/${trainerId}`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(postModel),
      })
        .then((res) => {
          if (res.ok) {
            // Post creation successful
            alert('Post created successfully!');
            handleCloseModal();
            // Additional actions if needed
            // Fetch the updated posts after creating a new post
            fetchPosts();
          } else {
            // Handle post creation failure
            alert('Failed to create post. Please try again later.');
          }
        })
        .catch((error) => {
          console.error('Error creating post:', error);
          alert('Failed to create post. Please try again later.');
        });
    };
  
    const fetchPosts = () => {
      if (!classroomId) {
        return;
      }
  
      fetch(`http://localhost:8080/classroom/allPosts/${classroomId}`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          setPosts([]); // Clear posts on error
        });
    };
  
    useEffect(() => {
      fetchPosts();
    }, [classroomId]);

  return (
    <div>
      <h1>Classroom</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Create Post
      </Button>
      {/* Textarea for entering classroom ID */}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="Enter Classroom ID"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
        />
      </Form.Group>

      {/* Modal for creating a post */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="classroomId">
            <Form.Label>Classroom ID</Form.Label>
            <Form.Control
              type="text"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postMessage">
            <Form.Label>Post Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatePost}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display posts */}
      {posts.map((post, index) => (
        <Card key={index} className="mt-4">
          <Card.Header>
            <h5 style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>{post.trainerName}</h5>
            <p style={{ fontFamily: 'Times New Roman', fontSize: '12px' }}>{post.date}</p>
          </Card.Header>
          <Card.Body>
            <p style={{ fontFamily: 'Calibri', fontSize: '16px' }}>{post.message}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ClassroomPage;
