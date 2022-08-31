import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Home = (props) => {
  return (
    <Fragment>
      <div class="shadow-sm p-3 mb-10 bg-body rounded container text-center ">
       <p>Hello</p>
     
       <Link to="/tasks" className="btn btn-outline-primary">All Tasks</Link>
        <Outlet />

      </div>
    </Fragment>
  );
};

export default Home;
