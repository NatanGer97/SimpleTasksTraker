import { startTransition, useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const usernameReducer = (state, action) => 
{
  if (action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid: action.val.length > 0};
  }

  if(action.type === 'INPUT_BLUR')
  {
    
    return {value: state.value, isValid: state.value.includes("@")};
  }

  return {value: "", isValid: false};
}
const nameReducer = (state, action) => 
{
  if (action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid: action.val.length > 0};
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.length > 0};
  }

  return {value: "", isValid: false};
}
const passwordReducer = (state, action) => 
{
  if (action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid: action.val.length > 3};
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.length > 3};
  }

  return {value: "", isValid: false};
}

function SignupForm() {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {value: "", isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "",isValid: null,});
  const [nameState, dispatchName] = useReducer(nameReducer, {value: "",isValid: null,});
  const[isFormValid, setIsFormValid] = useState(false);

  function usernameChangeHandler(event)
  {
    dispatchUsername({type: 'USER_INPUT', val: event.target.value});
  }

  function passwordChangeHandler(event)
  {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
  }
  function validatePasswordHandler()
  {
    dispatchPassword({type: 'INPUT_BLUR'});
  } 

  function validateUsernameHandler()
  {
    dispatchUsername({type: 'INPUT_BLUR'});
  }

  function nameChangeHandler(event)
  {
    dispatchName({type: 'USER_INPUT', val: event.target.value});
  }
  function validateNameHandler()
  {
    dispatchName({type: 'INPUT_BLUR'});
  } 
  const {isValid: isUsernameValid} = usernameState;
  const {isValid: isPasswordValid} = passwordState;
  const {isValid: isNameValid} = nameState;

  useEffect(()=>
  {
      const timerId = setTimeout(() => {
        console.log("checking for validity!");
        setIsFormValid(isUsernameValid && isPasswordValid && isNameValid);
      }, 500);

      return () => {console.log("cleanup "); clearTimeout(timerId)};
  },[isPasswordValid,isUsernameValid,isNameValid])
  
  return (
    <Form className="">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={usernameChangeHandler}
          onBlur={validateUsernameHandler}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName"
           onChange={nameChangeHandler}
           onBlur={validateNameHandler}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isFormValid}>
        Submit
      </Button >
    </Form>
  );
}

export default SignupForm;