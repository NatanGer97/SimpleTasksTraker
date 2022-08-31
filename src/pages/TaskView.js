import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import TaskCounter from "../Components/Tasks/TaskCounter";
import TaskTable from "../Components/Tasks/TasksTable";
import taskSlice from "../store/tasks-slice";

const TaskView = (props) => {
    const taskCounter = useSelector((state) => state.task_slice.totalTasks);
    const tasks = useSelector((state) => state.task_slice.tasks);
    const dispatch = useDispatch();
   
    return (
    <Fragment>
      <div class="d-flex justify-content-between  container ">
        <Link to={"/new-task"} className="btn btn-outline-primary " com>
          New Task
        </Link>
        <div><TaskCounter amount={tasks.length} />
        </div>
        {/* <span>{taskCounter}</span> */}
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
