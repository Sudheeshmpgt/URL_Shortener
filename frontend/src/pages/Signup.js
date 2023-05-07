import React, { useState } from 'react';
import {Card, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {RestService} from '../rest'
import Toast from '../components/sweetAlert/sweetAlert';

export let SignUpPage = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  let handleSignup = () => {
    let errors = {
        name:false,
        email:false,
        password:false
    }
    let setError = false
    if(name === ""){
        errors.name = "Invalid Name"
        setError = true
    }
    if(email === ""){
        errors.email = "Invalid Email"
        setError = true
    }
    if(password === ""){
        errors.password = "Invalid Password"
        setError = true
    }
    setErrors(errors)
    if(!setError){
        let body = {
            name,
            email,
            password
        }
        RestService.signup(body)
        .then((res)=>{
          if(res?.error){
            Toast.fire({
              icon: "error",
              title: res?.error,
            });
          }else{
            Toast.fire({
              icon: "success",
              title: res?.message,
            });
            navigate('/')
          }
        })
        .catch((error)=>{
            console.log(error)
            Toast.fire({
              icon: "error",
              title: "User signup failed",
            });
        })
    }
  }

  let handleLogin = () => {
    navigate('/')
  }

  return (
    <Card style={{ width: '28rem', marginLeft:'auto', marginRight:'auto', marginTop:'10%', boxShadow:'3px 3px 6px 0px' }}>
      <Card.Body >
        <Card.Title className='text-center mt-2 mb-2'>SignUp</Card.Title>
        <Form.Control 
        className='mt-4 mb-1'
        type='text'
        name='name'
        placeholder='Enter name'
        isInvalid={errors.name}
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        {errors?.name && (
            <span className='text-danger'>{errors?.name}</span>
        )}
        <Form.Control 
        className='mt-3 mb-1'
        type='email'
        name='email'
        placeholder='Enter email'
        isInvalid={errors.email}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        {errors?.email && (
            <span className='text-danger'>{errors?.email}</span>
        )}
        <Form.Control 
        className='mt-3 mb-1'
        type='password'
        name='password'
        placeholder='Enter password'
        isInvalid={errors.password}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        {errors?.password && (
            <span className='text-danger'>{errors?.password}</span>
        )}
        <div className='mt-3 mb-2 btn btn-primary' onClick={handleSignup}> SignUp</div>
        <Card.Text>Already have an account? <a className='border-bottom' style={{cursor:'pointer'}} onClick={handleLogin}>Login</a></Card.Text>
      </Card.Body>
    </Card>
  )
}