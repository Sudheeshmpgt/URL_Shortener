import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { RestService } from '../../rest';
import Toast from "../sweetAlert/sweetAlert";

export let TodoForm = ({ show, handleClose }) => {
    const [task, setTask] = useState("")
    const [priority, setPriority] = useState(0)
    const [errors, setErrors] = useState({})

    let clearFields = () => {
        setTask("");
        setPriority(0);
      };

    let handleDiscard = () => {
        clearFields();
        handleClose(false);
    };

    let handleSubmit = () => {
        let errors = {
            task:false,
            priority:false,
        }
        let setError = false
        if(task === ""){
            errors.task = "Invalid task"
            setError = true
        }
        if(priority === 0){
            errors.priority = "Invalid priority"
            setError = true
        }
        setErrors(errors)
        if(!setError){
            let body = {
                text: task,
                priority: priority,
                status: 'pending'
            }
            let token = localStorage.getItem('token')
            RestService.createTodo(body, token)
            .then((res)=>{
                Toast.fire({
                  icon: "success",
                  title: res?.message,
                });
                handleClose(true);
                clearFields();
            })
            .catch((error)=>{
                console.log(error)
                Toast.fire({
                  icon: "error",
                  title: "New todo creation failed",
                });
            })
        }
    }
    let priorities = [1,2,3,4,5,6,7,8,9]
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={"md"}
      backdrop={true}
      fullscreen={false}
    >
      <Modal.Header closeButton={true} className="py-0">
        <Modal.Title className="p-0 mt-4 mb-0">
          Create Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          height: 400,
          maxHeight: 200, 
          overflowY: "auto",
          display: "flex",
        }}
      >
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-12 pb-3">
                <b className="small"></b>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-2">
                      <label className="text-muted small">Policy</label>
                      <Form.Control
                        autoFocus={true}
                        type="text"
                        className="form-control"
                        placeholder="Enter something..."
                        isInvalid={errors.task}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                      {errors.task && (
                        <span className="small text-danger">
                          * {errors.task}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-2">
                      <label className="text-muted small">Insurer</label>
                      <Form.Select
                        autoFocus
                        type="text"
                        className="form-control"
                        isInvalid={errors.priority}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value={0}>Choose priority</option>
                        {
                          priorities.map((i, index)=>(
                            <option key={index} value={i}>{i}</option>
                          ))
                        }
                      </Form.Select>
                      {errors.priority && (
                        <span className="small text-danger">
                          * {errors.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <div
            className="btn btn-sm btn-success ms-auto"
            variant="secondary"
            onClick={handleSubmit}
          >
            <i className="fa fa-check me-2"></i>
            Add Todo
          </div>
        <div
          className="btn btn-sm btn-secondary ms-2"
          variant="primary"
          onClick={handleDiscard}
        >
          <i className="fa fa-times me-2"></i>
          Discard
        </div>
      </Modal.Footer>
    </Modal>
  );
};
