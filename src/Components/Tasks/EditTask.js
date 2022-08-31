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
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  let task;
  if (taskId) {
    task = tasks.filter((task) => task.id == taskId);
    task = task[0];
    
  }


  function onTitleChangedHandler(event) {
    console.log(`Task-title:${task.title}`);
    setTitle(event.target.value.trim());
 
   
  }

  function onContentChangeHandler(event) {
    console.log(`Task-content:${task.content}`);
    setContent(event.target.value.trim());

  }

 

  function onSubmitHandler(event) {
    event.preventDefault();
      
    dispatch(taskSlice.actions.replaceTask({
      id: taskId,
      title: titleInputRef.current.value,
      content: contentInputRef.current.value,
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
              
              defaultValue= {task.title}
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
          <div className="p-4">
            <button >save</button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default EditTask;
