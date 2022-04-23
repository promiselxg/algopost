import React from "react";
import { Card, Typography, CircularProgress } from "@mui/material";



const Loading = () => {
  return (
    <div className="Loading-cont">
      <Card
      raised={true}
        className="spinner-border text-success"
        role="status"
        style={{ width: "50px", height: "50px" }}
      >
        <CircularProgress size={40} />
      </Card>
    </div>
  );
};

export default Loading;
