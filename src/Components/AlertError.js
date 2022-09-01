import React from "react";

function AlertError(props) {
  return (
    <div className="alert alert-danger container" role="alert">
      <div className="text-center">
        <button
          type="button"
          className="btn-close float-end"
          aria-label="Close"
          onClick={props.onConfirm}
        ></button>
        <h4 className="alert-heading">{props.title}</h4>
        <hr />
        <h4 className="mb-0">{props.message}</h4>
      </div>
    </div>
  );
}

export default AlertError;
