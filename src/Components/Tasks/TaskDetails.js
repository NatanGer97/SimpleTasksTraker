import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import taskSlice from "../../store/tasks-slice";

const TaskDetails = (props) => {
  const params = useParams();
  const { taskId } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task_slice.tasks);
  let task;
  if (tasks) {
    task = tasks.filter((_task) => _task.id == taskId);
    task = task[0];
    console.log(task);
  }

  function onDeleteHandler()
  {
    console.log("Delete");
    dispatch(taskSlice.actions.removeTask(taskId));
    navigate('/tasks')
    // dispatch(taskSlice.actions.removeTask(taskId));
  }

  return (
    <Card style={{ width: "18rem" }} className="container">
      <Card.Body>
        <h3>{task.title}</h3>
        <i className={`bi bi-${task.status ? "lock" : "unlock"}`}></i>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate(`/tasks/edit/${taskId}`)}
          >
            Edit <i class="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-outline-danger" onClick={onDeleteHandler}>
            Delete <i class="bi bi-trash3"></i>
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskDetails;
