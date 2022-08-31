import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import TaskTable from "../Components/Tasks/TasksTable";
import taskSlice from "../store/tasks-slice";

const TaskView = (props) => {
    const taskCounter = useSelector((state) => state.task_slice.totalTasks);
    const tasks = useSelector((state) => state.task_slice.tasks);
    const dispatch = useDispatch();
    function addHandler(param) 
    {
        console.log("Clicked");
        dispatch(taskSlice.actions.increaseCounter());
    } 
    return (
    <Fragment>
      <div class="d-flex justify-content-between  container ">
        <Link to={"/new-task"} className="btn btn-outline-primary " com>
          New Task
        </Link>
        <button className="btn btn-outline=primary" onClick={addHandler} ></button>
        <span>{taskCounter}</span>
      </div>
      <TaskTable tasks={tasks}/>
      <hr />
      <div className="container text-center">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default TaskView;
