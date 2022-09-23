import { logDOM } from "@testing-library/react";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem("token") !== null);
  }, [isLogin]);
  const navigate = useNavigate();
  async function loginHandler(username, password) {
  
    let formData = new FormData();
     
    formData.append("username", "Natan");
    formData.append("password", "1234");
   
    const reqOptions = {
      method: "Post",
      body: formData,
      headers: { Accept: "application/json" },
    };
    const response = await fetch("http://localhost:8080/api/login", reqOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data['access_token']);
      localStorage.setItem("token", data["access_token"]);
      alert("Connected");
      setIsLogin(true);
      navigate(`welcome/${data['username']}`);
      
    } else {
      console.log(response);
    }

    
  }

  return (
    <Fragment>
      <div class="shadow-sm p-3 mb-10 bg-body rounded container text-center ">
        {isLogin ? <p>Hello</p> : <p>Please Login</p>}
        <button className="btn btn-outline-primary m-2" onClick={loginHandler}>
          Login1
        </button>
      <Link to="/login" pr className="btn btn-outline-primary m-2">Login</Link>


        <Link to="/tasks" className="btn btn-outline-primary">
          All Tasks
        </Link>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Home;
