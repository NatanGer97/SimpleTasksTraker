import { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import taskSlice from "../../store/tasks-slice";

function EditTask() {
  const params = useParams();
  const taskId = params.taskId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.task_slice.tasks);
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const taskStatusRef = useRef(); 

  let task;

  if (taskId) {
    task = tasks.filter((task) => task.id == taskId);
    task = task[0];
    console.log(task);
    
  }
const [taskDone, setTaskDone] = useState(task.status);
const [title, setTitle] = useState(task.title);
const [content, setContent] = useState(task.content);


  function onSwitchChanged(event) {
    setTaskDone(!taskDone);
  }

  function onTitleChangedHandler(event) {
    setTitle(event.target.value.trim());
 
   
  }

  function onContentChangeHandler(event) {
    // console.log(`Task-content:${task.content}`);
    setContent(event.target.value.trim());

  }

  function onSubmitHandler(event) {
    event.preventDefault();
    console.log(task.status);
      
    dispatch(taskSlice.actions.replaceTask({
      id: taskId,
      title: title ? title : titleInputRef.current.value,
      content: content ? content : contentInputRef.current.value,
      status: taskDone,
    }));

    navigate('/tasks');
    
  
  }

  return (
    <Card style={{ width: "18rem" }} className="container">
      <Card.Body>
        <form onSubmit={onSubmitHandler}>
          <div class="form-floating mb-3">
            <input
            ref={titleInputRef}
              type="text"
              class="form-control"
              id="floatingTitle"              
              defaultValue={task.title}
              onChange={onTitleChangedHandler}
            />
            <label for="floatingTitle">{task.title}</label>
          </div>
          <div class="form-floating">
            <input
            ref={contentInputRef}
              defaultValue= {task.content}
              type="text"
              class="form-control"
              id="floatingContent"
              placeholder={task.content}
              onChange={onContentChangeHandler}

            />
            <label for="floatingContent">{task.content}</label>
          </div>
          <div className="form-check form-switch m-2">
            <input
            ref={taskStatusRef}
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              onChange={onSwitchChanged}
              checked={taskDone}
            />
            <label className="form-check-label" for="flexSwitchCheckChecked">
              {taskDone ? "Done": "In-Progress"}
            </label>
            </div>
          <div className="p-2">
            <button className="btn btn-outline-primary">save changes</button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default EditTask;
