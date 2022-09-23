import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Feedback from 'react-bootstrap/esm/Feedback';

import { useOutletContext, useParams } from 'react-router-dom';


function UserPage(props) {
    const context = useOutletContext();
    const [user,setUser] = useState({});
    const [show , setShow] = useState(true);
    const [error, setError] = useState(null);
    const {username} = useParams();
    useEffect(() => {
      setError(null);
      const reqOpt = {
        method:"GET",
        headers:{Authorization:localStorage.getItem('token')}
    }
     const fetchUser = async () => {
      
      console.log("useEffect");
       try {
         const response = await fetch(`http://localhost:8080/api/user/${username}`,reqOpt);
         if (response.ok) {
           const data = await response.json();
           setUser(data);
           console.log(data);
         }
         if(response.status == 404)
         {
          const responseErrorMsg = await response.text();
          setError(responseErrorMsg)
          console.log(responseErrorMsg);

        }
       } catch (err) {
         console.log(err);
         alert(err);
       }
     };
     
     fetchUser();
        // fetch(`http://localhost:8080/api/user/Natan`,reqOpt)
        // // fetch(`http://localhost:8080/api/user/${username}`,reqOpt)
        // // fetch(`http://localhost:8080/api/user/${context.username}`,reqOpt)
        // .then(response => {
        //   console.log("fetching");
        //     if(response.ok)
        //     {
              
        //         response.json().then(data => {
        //             console.log(data);
        //             setUser(data);
                    
        //         });
        //     }
        //     else {alert(response)}
        //   /* if (response.status == 400)
        //   {
        //     alert("error");
        //   } */
        // })
        // console.log(user);
    },[])

    return (
      <>
        {error ? (
          <div
            className="container alert alert-danger alert-dismissible fade show"
            role="alert">
            <h4 className="alert-heading">
              {" "}
              <span class="bi bi-exclamation-triangle">{` Error`}</span>
            </h4>
            <p className="alert-body">{error}</p>
            <hr />
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <h4 className="alert-heading">{`Welcome Back ${user.name}`}</h4>
            <hr />
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
      </>
    );

}

export default UserPage;