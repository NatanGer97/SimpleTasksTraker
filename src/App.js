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
function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
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
