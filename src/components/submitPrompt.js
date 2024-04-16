import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const customStyle = {
    textColor: { color: '#000' },
    submitButtonColor: { backgroundColor: '#0d213d', color: '#fff', borderColor: '#fff'},
    button: {
      padding: "1rem 0.525rem",
      margin: "0.25rem",
      fontSize: "calc(10px + 2vmin)",
      width: "100%",
      backgroundColor: "#657dff",
      color: "#ffffff",
      border: "#657dff",
      borderRadius: "3px",
      cursor: "pointer",
    }
}

function Prompt() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button onClick={handleShow} style={customStyle.button}>
          Submit
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title style={customStyle.textColor}>Confirm Submit</Modal.Title>
          </Modal.Header>
          <Modal.Body style={customStyle.textColor}>
            Please click Confirm button to submit. Or Cancel button if this was 
            a mistake.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button style={customStyle.submitButtonColor} >Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default Prompt;