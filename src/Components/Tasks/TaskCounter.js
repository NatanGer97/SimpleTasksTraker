import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function TaskCounter(props) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <button  className="btn btn-primary position-relative">
        <i className="bi bi-pencil"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {props.amount}
          <span className="visually-hidden">{"msg"}</span>
        </span>
      </button>
    </Fragment>
  );
}

export default TaskCounter;
