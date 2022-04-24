// import { Typography } from "@mui/material";
import UploadFile from "../../UploadFile/UploadFile";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState"; 
 
// import "./UploadFile.css"; 

const AssignmentSubmission = ({assignment}) => {

    const {  person, token, URL } = useContext(GlobalContext);
      
    return (
        <>
            <UploadFile assignment={assignment}  />
        </>
    )
}
export default AssignmentSubmission