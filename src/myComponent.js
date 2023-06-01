import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./thunk_action_Creator";
const MyComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  console.log(data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
};

export default MyComponent;
