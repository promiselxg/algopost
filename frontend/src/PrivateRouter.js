import React from "react";
import { Navigate, Route } from "react-router-dom";

function PrivateRouter({ element: Component, ...rest }) {
  return (
    <Route
      {...rest}
      element={(props) => {
        const token = window.localStorage.getItem("userInfo");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Navigate to={"/login"} />;
        }
        } 
        }
    />
  );
}

export default PrivateRouter;
