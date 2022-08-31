import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShowTask = (props)  => 
{
    const params = useParams();
    const items = useSelector(state => state.task_slice.tasks);
   console.log({params: params});
   const res = items.find((item) => item.id == params.taskId);
   console.log({res: res});
   console.log(` params:${params.taskId}`);
    return (
        <><p>{res.title}</p><p>{res.content}</p><p>{res.id}</p></>
    );
};

export default ShowTask;
