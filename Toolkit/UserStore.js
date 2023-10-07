import { configureStore } from "@reduxjs/toolkit";
import User_Reducer from "./User_Reducer";
export default configureStore({
    reducer : {
        user : User_Reducer
    }
})