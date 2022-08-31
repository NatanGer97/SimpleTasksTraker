import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task_slice",
  initialState: { tasks: [], totalTasks: 0 },
  reducers: {
    
    findTask(state,action)
    {
      const taskId = action.payload;
      console.log(taskId);
      const existingTask = state.tasks.filter((task) => task.id == taskId);
      // return existingTask; 
      

    },

    replaceTask(state,action)
    {
        const task = action.payload;
        console.log(task);
        const index = state.tasks.findIndex((currTask) => currTask.id == task.id);
        console.log(index);
        state.tasks[index] = task;
        console.log(state.tasks[index]);
    },
    addTask(state, action) {
      const newTask = action.payload;
      const existingTask = state.tasks.find((task) => task.id === newTask.id);
      state.totalTasks++;
      if (!existingTask) {
        state.tasks.push({
          id: Math.floor(Math.random() * 1000) + 1,
          title: newTask.title,
          content: newTask.content,
          status: newTask.status,
        });
      }
     
    },

    increaseCounter(state)
    {
        console.log("increase");
        state.totalTasks = state.totalTasks + 1;
    },

    removeTask(state, action) {},
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;
