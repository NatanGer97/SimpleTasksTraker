import { useRef } from "react";
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

const NewTask = (props) => {
  const [taskIsDone, setTaskIsDone] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleInputRef = useRef();
  const contentInputRef = useRef();




  function changeHandler(event) {
    console.log(event.target.checked);
    setTaskIsDone(!taskIsDone);
  }
  function submitHandler(event) {
    event.preventDefault();
    console.log("Submitted");
    const taskStatus = taskIsDone ? "done" : "in-progress";

    dispatch(
      taskSlice.actions.addTask({
        title: titleInputRef.current.value,
        content: contentInputRef.current.value,
        status: taskStatus,
      })
    );

    navigate("/tasks");
  }
  return (
    <Fragment>
      <ContainerWrapper>
        <form action="" onSubmit={submitHandler}>
          <div className="form-floating mb-3">
            <input
              ref={titleInputRef}
              type="text"
              className="form-control"
              id="floatingTaskTitle"
              placeholder="Task Title"
            />
            <label for="floatingTaskTitle">Title</label>
          </div>
          <div className="form-floating">
            <input
              ref={contentInputRef}
              type="text"
              className="form-control"
              id="floatingTaskContent"
              placeholder="content"
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
          <button>submit</button>
        </form>
      </ContainerWrapper>
    </Fragment>
  );
};

export default NewTask;
