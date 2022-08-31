import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

const items = [
  { id: 1, content: "content", title: "title",status:"false" },
  { id: 2, content: "content2", title: "title3", status: "true" },
];

const TaskTable = (props) => {
  return (
    <>
      <div className="container">
        <h3 className="text-center">Title</h3>
    
      </div>
      <table class="table table-striped  table-hover container">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
            {props.tasks.map((task) => <TaskItem key={task.id} task={task} />)}
            {/* {items.map((task) => <TaskItem key={task.id} task={task} />)} */}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
