import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";


//用于支持异步action
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export default configureStore(
  {
    reducer: {
     
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);