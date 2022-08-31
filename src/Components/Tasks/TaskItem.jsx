import { Link } from "react-router-dom";


const TaskItem = (props) => 
{
    return (
        <tr>
        <th scope="row">{props.task.id}</th>
        <td>{props.task.title}</td>
        <td>{props.task.content}</td>
        <td> {props.task.status} </td>
        <td> <Link to={`${props.task.id}` } >info</Link> </td>
      </tr>
    );
};


export default TaskItem;