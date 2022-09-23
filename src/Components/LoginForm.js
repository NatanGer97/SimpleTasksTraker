import { type } from '@testing-library/user-event/dist/type';
import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const usernameReducer = (state, action) => 
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
    return {value: action.val, isValid: action.val.length > 0};
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.length > 0};
  }

  return {value: "", isValid: false};
}

function LoginForm() {
  const [error, setError] = useState(""); 
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); 

  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {value: "", isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "",isValid: null,});

  const {isValid: isUsernameValid} = usernameState;
  const {isValid: isPasswordValid} = passwordState;

  useEffect(()=>
  {
      const timerId = setTimeout(() => {
        console.log("checking for validity!");
        setIsFormValid(isUsernameValid && isPasswordValid);
      }, 500);

      return () => {console.log("cleanup "); clearTimeout(timerId)};
  },[isPasswordValid,isUsernameValid])

const [isFormValid, setIsFormValid] = useState(false);
  async function loginHandler(event) {
    event.preventDefault();
    

    let formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);

    /* 
    formData.append("username", "Natan");
    formData.append("password", "1234");
    */
    const reqOptions = {
      method: "Post",
      body: formData,
      headers: { Accept: "application/json" },
    };
    try
    {
      const response = await fetch("http://localhost:8080/api/login", reqOptions);
      if (response.ok) {
        const data = await response.json();
        console.log(data['access_token']);
        localStorage.setItem("token", data["access_token"]);
        alert("Connected");
        
        navigate(`/welcome/${data['username']}`);
        
      } else if(response.status == 400) {
        const data = await response.json();
        console.log(data.error);
        setError(data.error);
        return;
        
        }
    }
    catch(err)
    {
      alert(err);
    }

    
  }

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

  return (
    <Fragment>
      {error && (
        <div
          className="container alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <h4 className="alert-heading">
            {" "}
            <span className="bi bi-exclamation-triangle">{` Error`}</span>
          </h4>
          <p className="alert-body">{error}</p>
          <hr />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            ref={usernameRef}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={loginHandler}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}

export default LoginForm;