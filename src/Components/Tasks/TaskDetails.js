import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetails = (props) => {
    const params = useParams();
    const {taskId} = params;
    const navigate = useNavigate();
    const tasks = useSelector(state => state.task_slice.tasks);
    let task;
    if(tasks)
    {
        task = tasks.filter((_task) => _task.id == taskId);
        task = task[0];
        console.log(task);
    }

  return (
    <Card style={{ width: "18rem" }} className="container">
      <Card.Body>
        <h3>{task.title}</h3>
        <i className={`bi bi-${task.status? 'lock':'unlock'}`}></i>
        <div className="d-flex justify-content-between">
        <button  className="btn btn-outline-primary" onClick={()=> navigate(`/tasks/edit/${taskId}`)}>Edit</button>
        <button  className="btn btn-outline-danger">Delete</button>


        </div>

      {/*   <form onSubmit={{}}>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingTitle" />
            <label for="floatingTitle">{""}</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingContent" />
            <label for="floatingContent">{""}</label>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
            <label
              className="form-check-label"
              for="flexSwitchCheckChecked"
            ></label>
          </div>
          <div className="p-4">
            <button>save</button>
          </div>
        </form> */}
      </Card.Body>
    </Card>
  );
};

export default TaskDetails;
