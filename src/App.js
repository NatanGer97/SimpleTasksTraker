import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import TaskView from "./pages/TaskView";
import {Provider} from 'react-redux';
import store from "./store";
import NewTask from "./Components/Tasks/NewTask";
import ShowTask from "./Components/Tasks/ShowTask";
import EditTask from "./Components/Tasks/EditTask";
import TaskDetails from "./Components/Tasks/TaskDetails";
import WelcomePage from "./pages/WelcomePage";
import UserPage from "./Components/UserPage";
import LoginForm from "./Components/LoginForm";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-up" element={<SignupPage />}/>
          <Route path="/welcome" element={<WelcomePage />}>
            <Route path=":username" element={<UserPage />} />
          </Route>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="tasks" element={<Provider store={store}><TaskView/></Provider>} >
            <Route path=":taskId" element={<TaskDetails/>} />  
            </Route>        
            <Route path="new-task"  element={<Provider store={store}><NewTask/></Provider>} />
            <Route path="tasks/edit/:taskId"  element={<Provider store={store}><EditTask/></Provider>} />
            {/* <Route path="tasks/:taskId" element={<Provider  store={store}><EditTask/></Provider>}/>  */}

         

        </Routes>
      </main>
    </div>
  );
}

export default App;
