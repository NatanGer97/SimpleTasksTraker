
import {configureStore} from '@reduxjs/toolkit'
import taskSlice from './tasks-slice';


const store = configureStore({
    reducer: {task_slice: taskSlice.reducer}
});

export default store;