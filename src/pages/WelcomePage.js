import { Outlet, useParams } from "react-router-dom";


const WelcomePage = (props) => 
{
    const {username} = useParams();
    console.log(username);

    return (
        <div class="container-fluid">
            <p>Welcome Back</p>   
            <Outlet context={{'username': username}} />
     
        </div>
    )
}

export default WelcomePage;