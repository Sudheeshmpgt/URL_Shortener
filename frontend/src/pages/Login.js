import React,{useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {RestService} from '../rest';
import Toast from '../components/sweetAlert/sweetAlert'

export let LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  let handleSignup = () => {
    navigate('/signup')
  }

  let handleLogin = () => {
    let errors = {
      email:false,
      password:false
  }
  let setError = false
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
          email,
          password
      }
      RestService.login(body)
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
          localStorage.setItem('token', res?.token)
          localStorage.setItem('user', JSON.stringify(res?.user))
          navigate('/home')
        }
      })
      .catch((error)=>{
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      })
  }
  }
  return (
    <Card style={{ width: '28rem', marginLeft:'auto', marginRight:'auto', marginTop:'10%', boxShadow:'3px 3px 6px 0px' }}>
      <Card.Body >
        <Card.Title className='text-center mt-2 mb-2'>Login</Card.Title>
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
        <div className='mt-3 mb-2 btn btn-primary' onClick={handleLogin}> Login </div>
        <Card.Text>Don't have an account? <a className='border-bottom' style={{cursor:'pointer'}} onClick={handleSignup}>SignUp</a></Card.Text>
      </Card.Body>
    </Card>
  )
}