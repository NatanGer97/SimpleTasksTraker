import { useRef,useEffect,useReducer } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchParams,
  useHistory,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import taskSlice from "../../store/tasks-slice";
import ContainerWrapper from "../ContainerWrapper";

const titleReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.length > 0 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.length > 0 };

  }
  return { value: '', isValid: false };

};

const contentReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.length > 0 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.length > 0 };
  }

  return { value: '', isValid: false };

}

const NewTask = (props) => {
  const [taskIsDone, setTaskIsDone] = useState(false);  
  const [formIsValid, setFormIsValid] = useState(false);
  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: '', isValid: null
  });
  const [contentState, dispatchContent] = useReducer(contentReducer, {
    value: '', isValid: null
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  
  const { isValid: isTitleValid } = titleState;
  const { isValid: isContentValid } = contentState;

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(isContentValid && isTitleValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(timerId);
    };
  }, [isContentValid, isTitleValid]);


  function changeHandler(event) {
    console.log(event.target.checked);
    setTaskIsDone(!taskIsDone);
  }

  function titleChangeHandler(event)
  {
    dispatchTitle({ type: 'USER_INPUT', val: event.target.value });

  }
  function contentChangeHandler(event)
  {
    dispatchContent({ type: 'USER_INPUT', val: event.target.value });

  }

  function validateTitleHandler()
  {
    dispatchTitle({type: 'INPUT_BLUR'});
  }

  function validateContentHandler()
  {
    dispatchContent({type: 'INPUT_BLUR'});
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formIsValid)
    {
      console.log("Submitted");
      const taskStatus = taskIsDone;
  
      dispatch(taskSlice.actions.addTask({
          title: titleInputRef.current.value,
          content: contentInputRef.current.value,
          status: taskStatus,
        })
      );

      navigate("/tasks");

    }
    else if(!isTitleValid) 
    {
      titleInputRef.current.activate();
    }
    else 
    {
      contentInputRef.current.activate();
    }
  

  }
  return (
    <Fragment>
      <ContainerWrapper>
        <form action="" onSubmit={submitHandler}>
          <div className="form-floating mb-3">
            <input
              ref={titleInputRef}
              value={titleState.value}
              type="text"
              className="form-control"
              id="floatingTaskTitle"
              placeholder="Task Title"
              onChange={titleChangeHandler}
              onBlur={validateTitleHandler}
            />
            <label for="floatingTaskTitle">Title</label>
          </div>
          <div className="form-floating">
            <input
              ref={contentInputRef}
              value={contentState.value}
              type="text"
              className="form-control"
              id="floatingTaskContent"
              placeholder="content"
              onChange={contentChangeHandler}
              onBlur={validateContentHandler}
            />
            <label for="floatingTaskContent">Content</label>
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              onChange={changeHandler}
              checked={taskIsDone}
            />
            <label className="form-check-label" for="flexSwitchCheckChecked">
              Done
            </label>
          </div>
          <button disabled={!formIsValid}>submit</button>
        </form>
      </ContainerWrapper>
    </Fragment>
  );
};

export default NewTask;
